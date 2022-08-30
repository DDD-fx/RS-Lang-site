import {
  AUDIOCHALLENGE_GAME_SETTINGS,
  baseURL,
  MAX_TEXTBOOK_PAGES,
  WORDS_PER_TEXTBOOK_PAGE,
} from '../../../utils/constants';
import { TypedEmitter } from 'tiny-typed-emitter';
import { WordsChunkType } from '../../../types/textbookTypes';
import { AudioChallengeModelInterface } from '../../../types/games/audioChallengeTypes';

export class AudioChallengeModel extends TypedEmitter implements AudioChallengeModelInterface {
  wordsChunk: WordsChunkType[];

  shakedWordChunk: WordsChunkType[];

  constructor() {
    super();
    this.wordsChunk = [];
    this.shakedWordChunk = [];
  }

  getWordsList = async (query: string): Promise<void> => {
    const data = await fetch(baseURL + query);
    this.wordsChunk = await data.json();
    this.shakedWordChunk = this.shakeWordsArr();
  };

  getWordsListFromTextbook = (array: WordsChunkType[]): void => {
    this.wordsChunk = array;
    this.shakedWordChunk = this.shakeWordsArr();
  };

  shakeWordsArr = (): WordsChunkType[] => {
    const wordsArr = JSON.parse(JSON.stringify(this.wordsChunk));
    for (let i = this.wordsChunk.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordsArr[i], wordsArr[j]] = [wordsArr[j], wordsArr[i]];
    }
    return wordsArr;
  };

  turnGamePage = (): void => {
    AUDIOCHALLENGE_GAME_SETTINGS.wordCount += AUDIOCHALLENGE_GAME_SETTINGS.wordsPerPage;
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

  changeWord = (): void => {
    if (AUDIOCHALLENGE_GAME_SETTINGS.wordOfShakedArrCount < WORDS_PER_TEXTBOOK_PAGE) {
      AUDIOCHALLENGE_GAME_SETTINGS.wordOfShakedArrCount += 1;
    }
  };
}
