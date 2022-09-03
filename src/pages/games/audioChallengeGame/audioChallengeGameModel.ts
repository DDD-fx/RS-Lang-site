import {
  AUDIOCHALLENGE_GAME_SETTINGS,
  baseURL,
  WORDS_PER_TEXTBOOK_PAGE,
  STAT_ANONIM_DAY_DEFAULTS,
} from '../../../utils/constants';
import { TypedEmitter } from 'tiny-typed-emitter';
import { AggregatedWordType, WordsChunkType } from '../../../types/textbookTypes';
import { PutStatBodyType, StatAnswerType } from '../../../types/userTypes';
import { GameEnum } from '../../../types/enums';
import { LocalStorage } from '../../../utils/storage';
import { getShortDate } from '../../../utils/tools';
import { authFetch } from '../../../model/model';
import { getStat, putStat } from '../../../model/api/statApi';
import { AudioChallengeModelInterface } from '../../../types/games/audioChallengeTypes';
import { CorrectAnswersStatus, WordStatusEnum } from '../../../types/enums';
import { userIdValidator } from '../../../../server/src/utils/validation/validator';

export class AudioChallengeModel extends TypedEmitter implements AudioChallengeModelInterface {
  wordsChunk: WordsChunkType[];

  shakedWordChunk: WordsChunkType[];

  userStat: PutStatBodyType | null;

  constructor() {
    super();
    this.wordsChunk = [];
    this.shakedWordChunk = [];
    this.userStat = null;
  }

  getWordsList = async (query: string): Promise<void> => {
    const data = await fetch(baseURL + query);
    this.wordsChunk = await data.json();
    this.shakedWordChunk = this.shakeWordsArr();
  };

  getWordsListFromTextbook = (array: WordsChunkType[] | AggregatedWordType[]): void => {
    this.wordsChunk = array.slice();
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

  getWordData = async (id: string, flag: boolean) => {
    this.checkChainOfCorrectAnswers(flag);
    const DefaultUserWord = {
      difficulty: WordStatusEnum.new,
      optional: {
        correctAnswersChallenge: '0',
        incorrectAnswersChallenge: '0',
        correctSequenceChallenge: '0',
        correctAnswersSprint: '0',
        incorrectAnswersSprint: '0',
        correctSequenceSprint: '0',
      },
    };
    if (LocalStorage.currUserSettings.userId) {
      const query = `users/${LocalStorage.currUserSettings.userId}/aggregatedWords/${id}`;
      const word = await this.getUserWords(query);

      if (word) {
        if (word.userWord) {
          if (!word.userWord.optional.hasOwnProperty('correctSequenceChallenge')) {
            word.userWord.optional.correctSequenceChallenge = '0';
          }
          if (!word.userWord.optional.hasOwnProperty('correctSequenceSprint')) {
            word.userWord.optional.correctSequenceSprint = '0';
          }
        } else {
          word.userWord = JSON.parse(JSON.stringify(DefaultUserWord));
          this.updateWord(word, id, 'POST');
        }
        if (flag === true) {
          word.userWord.optional.correctAnswersChallenge = `${
            +word.userWord.optional.correctAnswersChallenge + 1
          }`;
          word.userWord.optional.correctSequenceChallenge = `${
            +word.userWord.optional.correctSequenceChallenge + 1
          }`;
        } else if (flag === false) {
          word.userWord.optional.incorrectAnswersChallenge = `${
            +word.userWord.optional.incorrectAnswersChallenge + 1
          }`;
          word.userWord.optional.correctSequenceChallenge = '0';
        }
        if (word.userWord.difficulty === WordStatusEnum.learned && flag === false) {
          word.userWord.difficulty = WordStatusEnum.new;
        } else if (word.userWord.difficulty === WordStatusEnum.difficult && flag === true) {
          if (
            +word.userWord.optional.correctAnswersChallenge %
              CorrectAnswersStatus.learnedForDifficult ===
            0
          ) {
            word.userWord.difficulty = WordStatusEnum.learned;
            AUDIOCHALLENGE_GAME_SETTINGS.learnedPerGame += 1;
          }
        } else if (word.userWord.difficulty === WordStatusEnum.new && flag === true) {
          if (
            +word.userWord.optional.correctAnswersChallenge % CorrectAnswersStatus.learnedForNew ===
            0
          ) {
            word.userWord.difficulty = WordStatusEnum.learned;
            AUDIOCHALLENGE_GAME_SETTINGS.learnedPerGame += 1;
          }
        }
        this.updateWord(word, id, 'PUT');
      }
    }
  };

  updateWord = async (word: AggregatedWordType, id: string, method: string): Promise<void> => {
    const query = `users/${LocalStorage.currUserSettings.userId}/words/${id}`;
    console.log(word);
    console.log(AUDIOCHALLENGE_GAME_SETTINGS.learnedPerGame);
    try {
      await authFetch(baseURL + query, {
        method: `${method}`,
        headers: {
          Authorization: `Bearer ${LocalStorage.currUserSettings.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(word.userWord),
      });
    } catch (e) {
      console.error(e);
    }
  };

  getUserWords = async (query: string): Promise<AggregatedWordType | void> => {
    try {
      const rawResponse = await authFetch(baseURL + query, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${LocalStorage.currUserSettings.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const content = (await rawResponse.json()) as AggregatedWordType[];
      return content[0];
    } catch (e) {
      console.error(e);
    }
  };

  getNewWordData = async (query: string, diff: number): Promise<void> => {
    const promise = await fetch(baseURL + query);
    const data = await promise.json();
    for (let i = 0; i < diff; i += 1) {
      await AUDIOCHALLENGE_GAME_SETTINGS.shakedWordsArray.push(
        data[Math.floor(Math.random() * (data.length - 1))],
      );
    }
  };

  checkChainOfCorrectAnswers = (flag: boolean): void => {
    if (flag === true) {
      AUDIOCHALLENGE_GAME_SETTINGS.tempSequenceOfCorrectAnswers += 1;
      if (
        AUDIOCHALLENGE_GAME_SETTINGS.tempSequenceOfCorrectAnswers >
        AUDIOCHALLENGE_GAME_SETTINGS.sequenceOfCorrectAnswers
      ) {
        AUDIOCHALLENGE_GAME_SETTINGS.sequenceOfCorrectAnswers =
          AUDIOCHALLENGE_GAME_SETTINGS.tempSequenceOfCorrectAnswers;
      }
    } else if (flag === false) {
      AUDIOCHALLENGE_GAME_SETTINGS.tempSequenceOfCorrectAnswers = 0;
    }
  };

  getStatistics = async (): Promise<void> => {
    if (LocalStorage.isAuth) {
      const { userId, token } = LocalStorage.currUserSettings;
      const answer = (await getStat(userId, token)) as StatAnswerType | null;
      if (answer) {
        delete answer.id;
      }
      this.userStat = answer;
      const dateKey = getShortDate();
      if (!this.userStat) {
        this.userStat = {
          learnedWords: 0,
          optional: { [dateKey]: JSON.parse(JSON.stringify(STAT_ANONIM_DAY_DEFAULTS)) },
        };
      }
      if (!(dateKey in this.userStat.optional)) {
        console.log('kek');
        this.userStat.optional[dateKey] = JSON.parse(JSON.stringify(STAT_ANONIM_DAY_DEFAULTS));
      }
    }
    console.log(this.userStat);
  };

  setStatistics = async (gameKey: GameEnum): Promise<void> => {
    if (LocalStorage.isAuth) {
      if (this.userStat) {
        const dateKey = getShortDate();
        const { userId, token } = LocalStorage.currUserSettings;
        const oldGameStat = this.userStat.optional[dateKey][gameKey];
        console.log(oldGameStat);
        const { learnedWords, unlearnedWords, sequenceOfCorrectAnswers, learnedPerGame } =
          AUDIOCHALLENGE_GAME_SETTINGS;
        const gameStatObj = {
          newWordsPerDay: learnedWords.length + unlearnedWords.length + oldGameStat.newWordsPerDay,
          learnedWordsPerDay: learnedPerGame + oldGameStat.learnedWordsPerDay,
          longestSeries: sequenceOfCorrectAnswers + oldGameStat.longestSeries,
          correctAnswers: learnedWords.length + oldGameStat.correctAnswers,
          incorrectAnswers: unlearnedWords.length + oldGameStat.incorrectAnswers,
        };
        this.userStat.optional[dateKey][gameKey] = gameStatObj;
        console.log(this.userStat);
        await putStat(userId, token, this.userStat);
      }
    }
  };
}
