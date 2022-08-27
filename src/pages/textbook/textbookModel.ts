import {
  AddUserWordReqType,
  AddUserWordRespType,
  AggregatedWordsRespType,
  AggregatedWordType,
  TextBookModelInterface,
  WordsChunkType,
  WordStatusEnum,
} from '../../types/textbookTypes';
import { baseURL } from '../../utils/constants';
import { TypedEmitter } from 'tiny-typed-emitter';
import { LocalStorage } from '../../utils/storage';

export class TextBookModel extends TypedEmitter implements TextBookModelInterface {
  wordsChunk: WordsChunkType[];

  aggregatedWords: AggregatedWordType[];

  difficultWords: WordsChunkType[];

  learnedWords: WordsChunkType[];

  constructor() {
    super();
    this.wordsChunk = [];
    this.aggregatedWords = [];
    this.difficultWords = [];
    this.learnedWords = [];
  }

  getTextBookList = async (): Promise<void> => {
    const query = `words?group=${LocalStorage.currUserSettings.currGroup}&page=${LocalStorage.currUserSettings.currPage}`;
    const data = await fetch(baseURL + query).catch();
    this.wordsChunk = (await data.json()) as WordsChunkType[];

    if (LocalStorage.currUserSettings.userId) {
      await this.getUserWordsForCurrGroup(WordStatusEnum.difficult);
      await this.getUserWordsForCurrGroup(WordStatusEnum.learned);
    }
    this.emit('getTextBookList');
  };

  getWordData = (id: string, onDictPage: boolean): void => {
    const selectedWord = onDictPage
      ? this.difficultWords.filter((el) => el.id === id)[0]
      : this.wordsChunk.filter((el) => el.id === id)[0];
    this.emit('getWordData', selectedWord);
  };

  getUserWordsForCurrGroup = async (wordStatus: WordStatusEnum): Promise<void> => {
    const query = `users/${LocalStorage.currUserSettings.userId}/aggregatedWords?group=${LocalStorage.currUserSettings.currGroup}&filter={"userWord.difficulty":"${wordStatus}"}`;
    await this.getUserWords(query, wordStatus);
  };

  getUserDictWords = async (): Promise<void> => {
    await this.updateUserWords(WordStatusEnum.difficult);
    this.emit('getUserDict');
  };

  updateUserWords = async (wordStatus: WordStatusEnum): Promise<void> => {
    const query = `users/${LocalStorage.currUserSettings.userId}/aggregatedWords?filter={"userWord.difficulty":"${wordStatus}"}`;
    await this.getUserWords(query, wordStatus);
  };

  getUserWords = async (query: string, wordStatus: WordStatusEnum): Promise<void> => {
    try {
      const rawResponse = await fetch(baseURL + query, {
        method: 'GET',
        headers: this.API_USER_REQ_HEADER,
      });
      const content = (await rawResponse.json()) as AggregatedWordsRespType[];
      const userWords = content[0].paginatedResults.slice();

      console.log('Model getUserWords', userWords);

      if (wordStatus === WordStatusEnum.difficult)
        this.difficultWords = this.mapUserWordsID(userWords);
      if (wordStatus === WordStatusEnum.learned) this.learnedWords = this.mapUserWordsID(userWords);
    } catch (e) {
      console.error(e);
    }
  };

  addUserWord = async (addUserWordReq: AddUserWordReqType, wordID: string): Promise<void> => {
    const query = `users/${LocalStorage.currUserSettings.userId}/words/${wordID}`;
    try {
      const rawResponse = await fetch(baseURL + query, {
        method: 'POST',
        headers: this.API_USER_REQ_HEADER,
        body: JSON.stringify(addUserWordReq),
      });
      const content = (await rawResponse.json()) as AddUserWordRespType;
      console.log('Model addUserWord', content); /////////////////////////
      if (addUserWordReq.difficulty === WordStatusEnum.learned) {
        await this.updateUserWords(WordStatusEnum.learned);
      }
    } catch (e) {
      console.error(e);
    }
  };

  deleteUserWord = async (
    wordID: string,
    onDictPage: boolean,
    wordStatus: WordStatusEnum,
  ): Promise<void> => {
    const query = `users/${LocalStorage.currUserSettings.userId}/words/${wordID}`;
    try {
      await fetch(baseURL + query, {
        method: 'DELETE',
        headers: this.API_USER_REQ_HEADER,
      });
      if (wordStatus === WordStatusEnum.difficult) {
        if (onDictPage) this.emit('removeDifficultWordElem', wordID);
        await this.updateUserWords(WordStatusEnum.difficult);
      }
      if (wordStatus === WordStatusEnum.learned) await this.updateUserWords(WordStatusEnum.learned);
    } catch (e) {
      console.error(e);
    }
  };

  getAggregatedWords = async (query: string): Promise<AggregatedWordType[] | void> => {
    try {
      const rawResponse = await fetch(baseURL + query, {
        method: 'GET',
        headers: this.API_USER_REQ_HEADER,
      });
      const content = (await rawResponse.json()) as AggregatedWordsRespType[];
      return content[0].paginatedResults.slice();
    } catch (e) {
      console.error(e);
    }
  };

  API_USER_REQ_HEADER = {
    Authorization: `Bearer ${LocalStorage.currUserSettings.token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  mapUserWordsID = (difficultWords: AggregatedWordType[]): WordsChunkType[] => {
    return difficultWords.map(({ _id: id, ...rest }) => ({ id, ...rest }));
  };
}
