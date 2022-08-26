import {
  AddDifficultWordReqType,
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

  constructor() {
    super();
    this.wordsChunk = [];
    this.aggregatedWords = [];
    this.difficultWords = [];
  }

  getTextBookList = async (): Promise<void> => {
    const query = `words?group=${LocalStorage.currUserSettings.currGroup}&page=${LocalStorage.currUserSettings.currPage}`;
    const data = await fetch(baseURL + query).catch();
    this.wordsChunk = (await data.json()) as WordsChunkType[];

    if (LocalStorage.currUserSettings.userId) await this.getDifficultWordsForCurrGroup();
    this.emit('getTextBookList');
  };

  getWordData = (id: string): void => {
    const selectedWord = this.wordsChunk.filter((el) => el.id === id)[0];
    this.emit('getWordData', selectedWord);
  };

  getUserDictWords = async (onDictPage = false): Promise<void> => {
    const query = `users/${LocalStorage.currUserSettings.userId}/aggregatedWords?filter={"userWord.difficulty":"${WordStatusEnum.difficult}"}`;
    await this.getDifficultWords(query);
    if (onDictPage) this.emit('getUserDict');
  };

  getDifficultWordsForCurrGroup = async (): Promise<void> => {
    const query = `users/${LocalStorage.currUserSettings.userId}/aggregatedWords?group=${LocalStorage.currUserSettings.currGroup}&filter={"userWord.difficulty":"${WordStatusEnum.difficult}"}`;
    await this.getDifficultWords(query);
  };

  addDifficultWord = async (
    addDifficultWordReq: AddDifficultWordReqType,
    wordID: string,
  ): Promise<void> => {
    const query = `users/${LocalStorage.currUserSettings.userId}/words/${wordID}`;
    try {
      const rawResponse = await fetch(baseURL + query, {
        method: 'POST',
        headers: this.API_USER_REQ_HEADER,
        body: JSON.stringify(addDifficultWordReq),
      });
      const content = (await rawResponse.json()) as AddUserWordRespType;
      console.log(content); /////////////////////////
    } catch (e) {
      console.error(e);
    }
  };

  getDifficultWords = async (query: string): Promise<void> => {
    try {
      const rawResponse = await fetch(baseURL + query, {
        method: 'GET',
        headers: this.API_USER_REQ_HEADER,
      });
      const content = (await rawResponse.json()) as AggregatedWordsRespType[];
      const difficultWords = content[0].paginatedResults.slice();
      this.mapDifficultWordsID(difficultWords);
    } catch (e) {
      console.error(e);
    }
  };

  deleteUserWord = async (wordID: string, onDictPage: boolean): Promise<void> => {
    const query = `users/${LocalStorage.currUserSettings.userId}/words/${wordID}`;
    try {
      await fetch(baseURL + query, {
        method: 'DELETE',
        headers: this.API_USER_REQ_HEADER,
      });
      await this.getUserDictWords(onDictPage);
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

  mapDifficultWordsID = (difficultWords: AggregatedWordType[]): void => {
    this.difficultWords = difficultWords.map(({ _id: id, ...rest }) => ({ id, ...rest }));
  };
}
