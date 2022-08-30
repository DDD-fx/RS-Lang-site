import {
  AUDIOCHALLENGE_GAME_SETTINGS,
  baseURL,
  WORDS_PER_TEXTBOOK_PAGE,
} from '../../../utils/constants';
import { TypedEmitter } from 'tiny-typed-emitter';
import { AggregatedWordsRespType, WordsChunkType } from '../../../types/textbookTypes';
import { AudioChallengeModelInterface } from '../../../types/gamesTypes';
import { LocalStorage } from '../../../utils/storage';
import { authFetch } from '../../../model/model';


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

  changeWord = (): void => {
    if (AUDIOCHALLENGE_GAME_SETTINGS.wordOfShakedArrCount < WORDS_PER_TEXTBOOK_PAGE) {
      AUDIOCHALLENGE_GAME_SETTINGS.wordOfShakedArrCount += 1;
    }
  };

  getWordData = async (word: string) => {
    const userId = LocalStorage.currUserSettings.userId;
    const query = `users/${LocalStorage.currUserSettings.userId}/aggregatedWords?group=${LocalStorage.currUserSettings.currGroup}&wordsPerPage=600"}`;
    await this.getUserWords(query);
  };

  getUserWords = async (query: string): Promise<void> => {
    try {
      const rawResponse = await authFetch(baseURL + query, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${LocalStorage.currUserSettings.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      const content = (await rawResponse.json()) as AggregatedWordsRespType[];
      console.log(content);
    } catch (e) {
      console.error(e);
    }
  };
}
