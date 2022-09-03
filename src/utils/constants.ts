import { AudioChallengeGameType } from '../types/games/audioChallengeTypes';
import { SprintGameType } from '../types/games/sprintTypes';
import { StatStateType } from '../types/userTypes';
import { UserSettingsType } from '../types/types';
import { getShortDate } from './tools';

export const baseURL = 'https://react-rslang-be-13.herokuapp.com/';
// 'https://react-rslang-be-13.herokuapp.com/';
// 'http://localhost:3001/';

export const MAX_TEXTBOOK_PAGES = 30;
export const DEFAULT_USER_SETTINGS: UserSettingsType = {
  userEmail: '',
  userName: 'User name',
  avatarURL: '',
  token: '',
  refreshToken: '',
  expireOn: 0,
  currPage: 0,
  currGroup: 0,
  currWord: '',
  userId: '',
};
export const DEFAULT_USER_NAME = 'default-user';

export const WORDS_PER_TEXTBOOK_PAGE = 20;

export const AUDIOCHALLENGE_GAME_SETTINGS: AudioChallengeGameType = {
  level: 0,
  wordsPerPage: 5,
  gamePage: 0,
  textbookPage: 0,
  wordCount: 0,
  soundingWordId: '',
  learnedWords: [],
  unlearnedWords: [],
  startFromTextbook: false,
  wordOfShakedArrCount: 0,
  shakedWordsArray: [],
  sequenceOfCorrectAnswers: 0,
  tempSequenceOfCorrectAnswers: 0,
  learnedPerGame: 0,
};

export const SPRINT_GAME_SETTINGS: SprintGameType = {
  level: 0,
  startFromTextbook: false,
  learnedWords: [],
  unlearnedWords: [],
  sequenceOfCorrectAnswers: 0,
  tempSequenceOfCorrectAnswers: 0,
  learnedPerGame: 0,
};

export const STAR_SVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg class="star-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
<path d="M54,5 86,105 1,43H107L22,105"/>
 </svg>`;

export const BIN_SVG = `<?xml version="1.0" encoding="utf-8"?>
<svg class="bin-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
<g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path d="M8388.5,4309c-130-26-290-94-396.1-164c-64-44-844.1-892.1-2288.4-2496.4C4497.9,312.4,3487.7-807.8,3457.7-837.8l-54-58l-698.1,604.1c-782.1,674.1-880.1,740.1-1170.2,782.1c-306,44-652.1-66-868.1-276C229.2-207.7,75.2-509.7,103.2-893.8c22-292,132-496.1,406.1-758.1c610.1-582.1,2448.4-2242.4,2554.4-2306.4c180-110,308.1-144,544.1-144c156,0,230,12,336,48c290,98,190-12,3104.5,3378.5c1840.3,2142.3,2706.4,3160.5,2740.4,3234.5c150,304,148,688.1-4,978.1c-64,122-384.1,446.1-572.1,580.1c-176,126-376.1,194-584.1,204C8540.5,4325,8432.5,4319,8388.5,4309z"/></g></g>
</svg>
`;

export const STAT_ANONIM_DEFAULTS: StatStateType = {
  dayData: {
    audiochallenge: {
      newWordsPerDay: 0,
      learnedWordsPerDay: 0,
      longestSeries: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
    },
    sprint: {
      newWordsPerDay: 0,
      learnedWordsPerDay: 0,
      longestSeries: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
    },
  },
  allDaysData: {
    labels: [getShortDate()],
    learnedWords: [0],
    newWords: [0],
  },
};
