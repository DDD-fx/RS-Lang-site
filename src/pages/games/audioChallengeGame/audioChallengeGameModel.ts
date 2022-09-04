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
import { ApiMethodsEnum, CorrectAnswersStatus, WordStatusEnum } from '../../../types/enums';

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
    this.wordsChunk = (await data.json()) as WordsChunkType[];
    this.shakedWordChunk = this.shakeWordsArr();
  };

  getWordsListFromTextbook = (array: WordsChunkType[] | AggregatedWordType[]): void => {
    this.wordsChunk = array.slice();
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

  turnGamePage = (): void => {
    AUDIOCHALLENGE_GAME_SETTINGS.wordCount += AUDIOCHALLENGE_GAME_SETTINGS.wordsPerPage;
    this.emit('drawGameBtns');
  };

  changeWord = (): void => {
    if (AUDIOCHALLENGE_GAME_SETTINGS.wordOfShakedArrCount < WORDS_PER_TEXTBOOK_PAGE) {
      AUDIOCHALLENGE_GAME_SETTINGS.wordOfShakedArrCount += 1;
    }
  };

  getWordData = (id: string, flag: boolean) => {
    this.checkChainOfCorrectAnswers(flag);
    if (LocalStorage.currUserSettings.userId) {
      const word = this.wordsChunk.find((el) => el.id === id) as AggregatedWordType;
      if (word) {
        if (!word.userWord) {
          word.userWord = {
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
          void this.updateWordOnChallengeAnswer(word, ApiMethodsEnum.post);
        }
        if (flag === true) {
          this.checkChallengeCorrectAnswer(word);
        } else if (flag === false) {
          this.checkChallengeIncorrectAnswer(word);
        }
      }
    }
  };

  checkChallengeCorrectAnswer = (gameCurrWord: AggregatedWordType): void => {
    const currWord = JSON.parse(JSON.stringify(gameCurrWord)) as AggregatedWordType;
    currWord.userWord.optional.correctAnswersChallenge = `${
      +currWord.userWord.optional.correctAnswersChallenge + 1
    }`;
    currWord.userWord.optional.correctAnswersChallenge = `${
      +currWord.userWord.optional.correctAnswersChallenge + 1
    }`;
    if (
      (currWord.userWord.difficulty === WordStatusEnum.difficult &&
        +currWord.userWord.optional.correctAnswersChallenge %
          CorrectAnswersStatus.learnedForDifficult ===
          0) ||
      (currWord.userWord.difficulty === WordStatusEnum.new &&
        +currWord.userWord.optional.correctAnswersChallenge % CorrectAnswersStatus.learnedForNew ===
          0)
    ) {
      currWord.userWord.difficulty = WordStatusEnum.learned;
      AUDIOCHALLENGE_GAME_SETTINGS.learnedPerGame += 1;
    }
    void this.updateWordOnChallengeAnswer(currWord, ApiMethodsEnum.put);
  };

  checkChallengeIncorrectAnswer = (gameCurrWord: AggregatedWordType): void => {
    const currWord = JSON.parse(JSON.stringify(gameCurrWord)) as AggregatedWordType;
    currWord.userWord.optional.incorrectAnswersChallenge = `${
      +currWord.userWord.optional.incorrectAnswersChallenge + 1
    }`;
    currWord.userWord.optional.correctSequenceChallenge = '0';
    if (currWord.userWord.difficulty === WordStatusEnum.learned)
      currWord.userWord.difficulty = WordStatusEnum.difficult;
    void this.updateWordOnChallengeAnswer(currWord, ApiMethodsEnum.put);
  };

  updateWordOnChallengeAnswer = async (
    currWord: AggregatedWordType,
    method: ApiMethodsEnum,
  ): Promise<void> => {
    const query = `users/${LocalStorage.currUserSettings.userId}/words/${currWord.id}`;
    console.log(currWord);
    try {
      await authFetch(baseURL + query, {
        method: `${method}`,
        headers: {
          Authorization: `Bearer ${LocalStorage.currUserSettings.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currWord.userWord),
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
    const data = (await promise.json()) as WordsChunkType[];
    for (let i = 0; i < diff; i += 1) {
      AUDIOCHALLENGE_GAME_SETTINGS.shakedWordsArray.push(
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
