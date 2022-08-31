import {
  AddUserWordBodyType,
  AggregatedWordsRespType,
  AggregatedWordType,
  RawAggregatedWordType,
  TextBookModelInterface,
  WordsChunkType,
  WordStatusEnum,
} from '../../types/textbookTypes';
import { baseURL } from '../../utils/constants';
import { TypedEmitter } from 'tiny-typed-emitter';
import { LocalStorage } from '../../utils/storage';
import { authFetch } from '../../model/model';
import { getElement } from '../../utils/tools';

export class TextBookModel extends TypedEmitter implements TextBookModelInterface {
  wordsChunk: WordsChunkType[];

  difficultWords: AggregatedWordType[];

  learnedWords: AggregatedWordType[];

  newWords: AggregatedWordType[];

  constructor() {
    super();
    this.wordsChunk = [];
    this.difficultWords = [];
    this.learnedWords = [];
    this.newWords = [];
  }

  getTextBookList = async (): Promise<void> => {
    const query = `words?group=${LocalStorage.currUserSettings.currGroup}&page=${LocalStorage.currUserSettings.currPage}`;
    const data = await fetch(baseURL + query).catch();
    this.wordsChunk = (await data.json()) as WordsChunkType[];

    if (LocalStorage.currUserSettings.userId) {
      await this.updateAllCollections();
      console.log('dif', this.difficultWords);
      console.log('learned', this.learnedWords);
      console.log('new', this.newWords);
    }
    this.emit('getTextBookList');
  };

  getWordCardData = (id: string, onDictPage: boolean): void => {
    const selectedWord = onDictPage
      ? this.difficultWords.filter((el) => el.id === id)[0]
      : this.wordsChunk.filter((el) => el.id === id)[0];
    this.emit('getWordCardData', selectedWord);
  };

  getAggregatedWordsForCurrGroup = async (wordStatus: WordStatusEnum): Promise<void> => {
    const query = `users/${LocalStorage.currUserSettings.userId}/aggregatedWords?group=${LocalStorage.currUserSettings.currGroup}&wordsPerPage=600&filter={"userWord.difficulty":"${wordStatus}"}`;
    await this.getAggregatedWords(query, wordStatus);
  };

  getUserDictWords = async (): Promise<void> => {
    await this.updateUserWordsCollection(WordStatusEnum.difficult);
    this.emit('getUserDict');
  };

  updateUserWordsCollection = async (wordStatus: WordStatusEnum): Promise<void> => {
    const query = `users/${LocalStorage.currUserSettings.userId}/aggregatedWords?wordsPerPage=600&filter={"userWord.difficulty":"${wordStatus}"}`;
    await this.getAggregatedWords(query, wordStatus);
  };

  getAggregatedWords = async (query: string, wordStatus: WordStatusEnum): Promise<void> => {
    try {
      const rawResponse = await authFetch(baseURL + query, {
        method: 'GET',
        headers: this.API_USER_REQ_HEADER,
      });
      const content = (await rawResponse.json()) as AggregatedWordsRespType[];
      const userWords = content[0].paginatedResults.slice();
      if (wordStatus === WordStatusEnum.difficult)
        this.difficultWords = this.mapUserWordsID(userWords);
      if (wordStatus === WordStatusEnum.learned) {
        this.learnedWords = this.mapUserWordsID(userWords);
        if (getElement('pagination ')) this.emit('updateMarkedPages');
      }
      if (wordStatus === WordStatusEnum.new) this.newWords = this.mapUserWordsID(userWords);
    } catch (e) {
      console.error(e);
    }
  };

  addUserWord = async (addUserWordReqBody: AddUserWordBodyType, wordID: string): Promise<void> => {
    const query = `users/${LocalStorage.currUserSettings.userId}/words/${wordID}`;
    try {
      await authFetch(baseURL + query, {
        method: 'POST',
        headers: this.API_USER_REQ_HEADER,
        body: JSON.stringify(addUserWordReqBody),
      });
      if (addUserWordReqBody.difficulty === WordStatusEnum.learned) {
        await this.updateUserWordsCollection(WordStatusEnum.learned);
      }
      if (addUserWordReqBody.difficulty === WordStatusEnum.difficult) {
        await this.updateUserWordsCollection(WordStatusEnum.difficult);
      }
    } catch (e) {
      console.error(e);
    }
  };

  updateUserWord = async (
    wordID: string,
    onDictPage: boolean,
    wordStatus: WordStatusEnum,
    isWordNew: boolean,
    makeNew: boolean,
  ): Promise<void> => {
    const updateUserWordReqBody = makeNew
      ? this.getAggregatedUserWordOptionsForNew(wordID, wordStatus)
      : this.getAggregatedUserWordOptions(wordID, wordStatus, isWordNew);
    const query = `users/${LocalStorage.currUserSettings.userId}/words/${wordID}`;
    try {
      await authFetch(baseURL + query, {
        method: 'PUT',
        headers: this.API_USER_REQ_HEADER,
        body: JSON.stringify(updateUserWordReqBody),
      });
      if (onDictPage) this.emit('removeDifficultWordElem', wordID);
      await this.updateAllCollections();
    } catch (e) {
      console.error(e);
    }
  };

  getAggregatedUserWordOptions = (
    wordID: string,
    wordStatus: WordStatusEnum,
    isWordNew: boolean,
  ): AddUserWordBodyType | undefined => {
    if (isWordNew) {
      const updatedWord = this.newWords.find((word) => word.id === wordID) as AggregatedWordType;
      const currWordOptions = updatedWord.userWord;
      currWordOptions.difficulty = wordStatus;
      return currWordOptions;
    }
    if (wordStatus === WordStatusEnum.difficult && !isWordNew) {
      const updatedWord = this.learnedWords.find(
        (word) => word.id === wordID,
      ) as AggregatedWordType;
      const currWordOptions = updatedWord.userWord;
      currWordOptions.difficulty = wordStatus;
      return currWordOptions;
    }
    if (wordStatus === WordStatusEnum.learned && !isWordNew) {
      const updatedWord = this.difficultWords.find(
        (word) => word.id === wordID,
      ) as AggregatedWordType;
      const currWordOptions = updatedWord.userWord;
      currWordOptions.difficulty = wordStatus;
      return currWordOptions;
    }
  };

  getAggregatedUserWordOptionsForNew = (
    wordID: string,
    wordStatus: WordStatusEnum,
  ): AddUserWordBodyType | undefined => {
    if (wordStatus === WordStatusEnum.difficult) {
      const updatedWord = this.difficultWords.find(
        (word) => word.id === wordID,
      ) as AggregatedWordType;
      const currWordOptions = updatedWord.userWord;
      currWordOptions.difficulty = WordStatusEnum.new;
      return currWordOptions;
    }
    if (wordStatus === WordStatusEnum.learned) {
      const updatedWord = this.learnedWords.find(
        (word) => word.id === wordID,
      ) as AggregatedWordType;
      const currWordOptions = updatedWord.userWord;
      currWordOptions.difficulty = WordStatusEnum.new;
      return currWordOptions;
    }
  };

  API_USER_REQ_HEADER = {
    Authorization: `Bearer ${LocalStorage.currUserSettings.token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  mapUserWordsID = (difficultWords: RawAggregatedWordType[]): AggregatedWordType[] => {
    return difficultWords.map(({ _id: id, ...rest }) => ({ id, ...rest }));
  };

  updateAllCollections = async (): Promise<void> => {
    await this.getAggregatedWordsForCurrGroup(WordStatusEnum.new);
    await this.getAggregatedWordsForCurrGroup(WordStatusEnum.learned);
    await this.getAggregatedWordsForCurrGroup(WordStatusEnum.difficult);
  };

  getWordsForGames = async (): Promise<RawAggregatedWordType[] | undefined> => {
    const query = `users/${LocalStorage.currUserSettings.userId}/aggregatedWords?group=${LocalStorage.currUserSettings.currGroup}&wordsPerPage=600&filter={"$or":[{"userWord.difficulty":"${WordStatusEnum.difficult}"},{"userWord.difficulty":"${WordStatusEnum.new}"},{"userWord":null}]}`;
    try {
      const rawResponse = await authFetch(baseURL + query, {
        method: 'GET',
        headers: this.API_USER_REQ_HEADER,
      });
      const content = (await rawResponse.json()) as AggregatedWordsRespType[];
      return content[0].paginatedResults.slice();
    } catch (e) {
      console.error(e);
    }
  };
}
