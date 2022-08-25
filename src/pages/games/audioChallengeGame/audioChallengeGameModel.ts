import {
  AUDIOCHALLENGE_GAME_SETTINGS,
  baseURL,
  MAX_TEXTBOOK_PAGES,
} from '../../../utils/constants';
import { TypedEmitter } from 'tiny-typed-emitter';
import { WordsChunkType } from '../../../types/textbookTypes';
import { AudioChallengeModelInterface } from '../../../types/gamesTypes';

export class AudioChallengeModel extends TypedEmitter
  implements AudioChallengeModelInterface {
  wordsChunk: WordsChunkType[];

  constructor(textBookPage: number) {
    super();
    this.wordsChunk = [];
  }

  getWordsList = async (queries: string[]): Promise<void> => {
    let data: any = [];
    queries.forEach(async (query) => data.push(await fetch(baseURL + query)));

    for (let i = 0; i < queries.length; i += 1) {
      const data = await fetch(baseURL + queries[i]);
      this.wordsChunk.push(await data.json());
      AUDIOCHALLENGE_GAME_SETTINGS.textbookPage += 1;
    }
    this.wordsChunk = this.wordsChunk.flat();
  };

  turnGamePage = (): void => {
    AUDIOCHALLENGE_GAME_SETTINGS.wordCount +=
      AUDIOCHALLENGE_GAME_SETTINGS.wordsPerPage;
    this.emit('drawGameBtns');
  };

  changeSettingsPage = (): void => {
    if (AUDIOCHALLENGE_GAME_SETTINGS.textbookPage < MAX_TEXTBOOK_PAGES) {
      AUDIOCHALLENGE_GAME_SETTINGS.textbookPage += 1;
      AUDIOCHALLENGE_GAME_SETTINGS.wordCount = 0;
    } else {
      AUDIOCHALLENGE_GAME_SETTINGS.textbookPage = 0;
      AUDIOCHALLENGE_GAME_SETTINGS.wordCount = 0;
    }
    this.wordsChunk = [];
    this.emit('turnTheTextBookPage');
  };
}
