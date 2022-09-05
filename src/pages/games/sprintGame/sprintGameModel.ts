import { TypedEmitter } from 'tiny-typed-emitter';
import { SprintEventsType, SprintModelInterface } from '../../../types/games/sprintTypes';
import {
  AggregatedWordsRespType,
  AggregatedWordType,
  RawAggregatedWordType,
  WordsChunkType,
} from '../../../types/textbookTypes';
import { baseURL, SPRINT_GAME_SETTINGS, STAT_ANONIM_DAY_DEFAULTS } from '../../../utils/constants';
import { GameEnum } from '../../../types/enums';
import { LocalStorage } from '../../../utils/storage';
import { getShortDate } from '../../../utils/tools';
import { authFetch } from '../../main/mainModel';
import { ApiMethodsEnum } from '../../../types/enums';
import { getStat, putStat } from '../../../api/statApi';
import { PutStatBodyType, StatAnswerType, StatOptionalDayType } from '../../../types/userTypes';
import history from '../../../utils/history';

export class SprintModel extends TypedEmitter<SprintEventsType> implements SprintModelInterface {
  allPageChunk: WordsChunkType[];

  wordsChunk: WordsChunkType[] | AggregatedWordType[];

  shakedWordChunk: WordsChunkType[] | AggregatedWordType[];

  userStat: PutStatBodyType | null;

  constructor() {
    super();
    this.allPageChunk = [];
    this.wordsChunk = [];
    this.shakedWordChunk = [];
    this.userStat = null;
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

  closeBtnModel = async () => {
    void (await this.setStatistics(GameEnum.sprint));
    if (!SPRINT_GAME_SETTINGS.startFromTextbook) {
      window.location.reload();
    } else {
      history.push('/textbook');
      window.location.reload();
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
          optional: {
            [dateKey]: JSON.parse(JSON.stringify(STAT_ANONIM_DAY_DEFAULTS)) as StatOptionalDayType,
          },
        };
      }
      if (!(dateKey in this.userStat.optional)) {
        this.userStat.optional[dateKey] = JSON.parse(
          JSON.stringify(STAT_ANONIM_DAY_DEFAULTS),
        ) as StatOptionalDayType;
      }
    }
  };

  setStatistics = async (gameKey: GameEnum): Promise<void> => {
    if (LocalStorage.isAuth) {
      if (this.userStat) {
        const dateKey = getShortDate();
        const { userId, token } = LocalStorage.currUserSettings;
        const oldGameStat = this.userStat.optional[dateKey][gameKey];
        const { newWords, learnedWords, unlearnedWords, sequenceOfCorrectAnswers, learnedPerGame } =
          SPRINT_GAME_SETTINGS;
        const gameStatObj = {
          newWordsPerDay: newWords + oldGameStat.newWordsPerDay,
          learnedWordsPerDay: learnedPerGame + oldGameStat.learnedWordsPerDay,
          longestSeries: sequenceOfCorrectAnswers + oldGameStat.longestSeries,
          correctAnswers: learnedWords.length + oldGameStat.correctAnswers,
          incorrectAnswers: unlearnedWords.length + oldGameStat.incorrectAnswers,
        };
        this.userStat.optional[dateKey][gameKey] = gameStatObj;
        await putStat(userId, token, this.userStat);
      }
    }
  };
}
