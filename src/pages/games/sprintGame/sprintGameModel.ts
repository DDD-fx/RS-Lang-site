import { TypedEmitter } from 'tiny-typed-emitter';
import { SprintEventsType, SprintModelInterface } from '../../../types/games/sprintTypes';
import { AggregatedWordType, WordsChunkType } from '../../../types/textbookTypes';
import { baseURL } from '../../../utils/constants';

export class SprintModel extends TypedEmitter<SprintEventsType> implements SprintModelInterface {
  wordsChunk: WordsChunkType[];

  shakedWordChunk: WordsChunkType[];

  constructor() {
    super();
    this.wordsChunk = [];
    this.shakedWordChunk = [];
  }

  getWordsList = async (query: string): Promise<void> => {
    const data = await fetch(baseURL + query);
    this.wordsChunk = (await data.json()) as WordsChunkType[];
    this.shakedWordChunk = this.shakeWordsArr();
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
}
