import { UserSettingsType } from '../types/types';

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
  currWord: 0,
};
export const NAMED_USER_SETTINGS = {
  userEmail: 'asdasd',
  userName: 'Test user name',
  avatarURL: 'asdsadas',
  token: 'asdasdasd',
  refreshToken: 'asdasdsa',
  stats: 'stats',
  currPage: 3,
  currGroup: 2,
  currWord: 8,
};

export const DEFAULT_USER_NAME = 'default-user';

