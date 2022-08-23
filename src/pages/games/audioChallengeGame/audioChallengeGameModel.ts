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

  constructor() {
    super();
    this.wordsChunk = [];
  }

  getWordsList = async (query: string): Promise<void> => {
    const data = await fetch(baseURL + query);
    this.wordsChunk = (await data.json()) as WordsChunkType[];
    this.emit('getWordList');
  };

  getWordData = (word: WordsChunkType) => {
    this.emit('getWordData', word);
  };

  closeAudioChallengeGame = () => {
    console.log('bye');
  };

  turnGamePage = () => {
    AUDIOCHALLENGE_GAME_SETTINGS.wordCount +=
      AUDIOCHALLENGE_GAME_SETTINGS.wordsPerPage;
    this.emit('drawGameBtns');
    console.log(AUDIOCHALLENGE_GAME_SETTINGS.wordCount);
  };

  changeSettingsPage = () => {
    if (AUDIOCHALLENGE_GAME_SETTINGS.page < MAX_TEXTBOOK_PAGES) {
      AUDIOCHALLENGE_GAME_SETTINGS.page += 1;
    } else {
      AUDIOCHALLENGE_GAME_SETTINGS.page = 0;
    }
    AUDIOCHALLENGE_GAME_SETTINGS.wordCount = 0;
    this.emit('drawGameBtns');
    console.log(AUDIOCHALLENGE_GAME_SETTINGS.page);
  };
}
