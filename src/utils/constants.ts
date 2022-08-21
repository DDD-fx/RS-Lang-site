import { AudioChallengeGameType, UserSettingsType } from '../types/types';

export const baseURL = 'https://react-rslang-be-13.herokuapp.com/';
// 'https://react-rslang-be-13.herokuapp.com/';
// 'http://localhost:3001/';

export const MAX_TEXTBOOK_PAGES = 30;
export const DEFAULT_USER_SETTINGS: UserSettingsType = {
  userEmail: '',
  userName: 'Test user name',
  avatarURL: '',
  token: '',
  refreshToken: '',
  stats: '',
  currPage: 0,
  currGroup: 0,
  currWord: '',
};
export const DEFAULT_USER_NAME = 'default-user';

export const AUDIOCHALLENGE_GAME_SETTINGS: AudioChallengeGameType = {
  level: 0,
  wordsPerPage: 5,
};