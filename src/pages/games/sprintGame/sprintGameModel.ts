import { TypedEmitter } from 'tiny-typed-emitter';
import { SprintEventsType, SprintModelInterface } from '../../../types/games/sprintTypes';
import {
  AggregatedWordsRespType,
  AggregatedWordType,
  RawAggregatedWordType,
  WordsChunkType,
} from '../../../types/textbookTypes';
import { baseURL, SPRINT_GAME_SETTINGS } from '../../../utils/constants';
import { LocalStorage } from '../../../utils/storage';
import { authFetch } from '../../../model/model';
import { ApiMethodsEnum } from '../../../types/enums';

export class SprintModel extends TypedEmitter<SprintEventsType> implements SprintModelInterface {
  allPageChunk: WordsChunkType[];

  wordsChunk: WordsChunkType[] | AggregatedWordType[];

  shakedWordChunk: WordsChunkType[] | AggregatedWordType[];

  constructor() {
    super();
    this.allPageChunk = [];
    this.wordsChunk = [];
    this.shakedWordChunk = [];
  }

  getWordsList = async (query: string): Promise<void> => {
    const data = await fetch(baseURL + query);
    this.wordsChunk = (await data.json()) as WordsChunkType[];
    this.shakedWordChunk = this.shakeWordsArr();
  };

  getUserWordsForSprint = async (): Promise<void> => {
    const query = `users/${LocalStorage.currUserSettings.userId}/aggregatedWords?group=${SPRINT_GAME_SETTINGS.level}&wordsPerPage=600`;
    try {
      const rawResponse = await authFetch(baseURL + query, {
        method: 'GET',
        headers: this.API_USER_REQ_HEADER,
      });
      const content = (await rawResponse.json()) as AggregatedWordsRespType[];
      this.wordsChunk = this.mapUserWordsID(content[0].paginatedResults.slice());
      this.allPageChunk = this.wordsChunk.slice();
      this.shakedWordChunk = this.shakeWordsArr().slice(0, 100);
      console.log('shaked', this.shakedWordChunk);
      console.log('allPage', this.allPageChunk);
    } catch (e) {
      console.error(e);
    }
  };

  getDefaultWordsForSprint = async (): Promise<void> => {
    for (let i = 0; i < 5; i += 1) {
      const query = `words?group=${SPRINT_GAME_SETTINGS.level}&page=${i}`;
      const data = await fetch(baseURL + query);
      const words = (await data.json()) as WordsChunkType[];
      this.wordsChunk = (<WordsChunkType[]>this.wordsChunk).concat(words);
    }
    this.allPageChunk = this.wordsChunk.slice();
    this.shakedWordChunk = this.shakeWordsArr();
  };

  getPageChunk = async (): Promise<void> => {
    const query = `words?group=${LocalStorage.currUserSettings.currGroup}&page=${LocalStorage.currUserSettings.currPage}`;
    const data = await fetch(baseURL + query);
    this.allPageChunk = (await data.json()) as WordsChunkType[];
  };

  shakeWordsArr = (): WordsChunkType[] => {
    const wordsArr = JSON.parse(JSON.stringify(this.wordsChunk)) as WordsChunkType[];
    for (let i = this.wordsChunk.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordsArr[i], wordsArr[j]] = [wordsArr[j], wordsArr[i]];
    }
    return wordsArr;
  };

  getWordsListFromTextbook = (collection: WordsChunkType[] | AggregatedWordType[]): void => {
    this.wordsChunk = collection.slice();
    this.shakedWordChunk = this.shakeWordsArr().slice();
  };

  updateWordOnSprintAnswer = async (
    currWord: AggregatedWordType,
    method: ApiMethodsEnum,
  ): Promise<void> => {
    const query = `users/${LocalStorage.currUserSettings.userId}/words/${currWord.id}`;
    console.log(currWord);
    try {
      await authFetch(baseURL + query, {
        method: `${method}`,
        headers: this.API_USER_REQ_HEADER,
        body: JSON.stringify(currWord.userWord),
      });
      this.emit('drawNextSprintQuestion');
    } catch (e) {
      console.error(e);
    }
  };

  API_USER_REQ_HEADER = {
    Authorization: `Bearer ${LocalStorage.currUserSettings.token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  mapUserWordsID = (aggregatedWords: RawAggregatedWordType[]): AggregatedWordType[] => {
    return aggregatedWords.map(({ _id: id, ...rest }) => ({ id, ...rest }));
  };
}
