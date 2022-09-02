import { TypedEmitter } from 'tiny-typed-emitter';
import { SprintEventsType, SprintModelInterface } from '../../../types/games/sprintTypes';
import { AggregatedWordType, WordsChunkType } from '../../../types/textbookTypes';
import { baseURL } from '../../../utils/constants';
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
}
