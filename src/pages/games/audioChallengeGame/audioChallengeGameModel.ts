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
      AUDIOCHALLENGE_GAME_SETTINGS.wordCount = 0;
      this.getNewPage();
    } else {
      AUDIOCHALLENGE_GAME_SETTINGS.page = 0;
      AUDIOCHALLENGE_GAME_SETTINGS.wordCount = 0;
    }
    this.emit('drawGameBtns');
    console.log(AUDIOCHALLENGE_GAME_SETTINGS.page);
    console.log(AUDIOCHALLENGE_GAME_SETTINGS.wordCount);
  };

  getNewPage = async () => {
    const query = `words?group=${AUDIOCHALLENGE_GAME_SETTINGS.level}&page=${AUDIOCHALLENGE_GAME_SETTINGS.page}`;
    await this.getWordsList(query);
    this.emit('turnThePage');
  };
}
