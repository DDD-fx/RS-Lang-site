import { LocalStorage } from '../utils/storage';
import { DEFAULT_USER_NAME, DEFAULT_USER_SETTINGS } from '../utils/constants';
import { getNewToken, getExpirationDate, isExpired } from './api/usersApi';
import { RequestOptionType } from '../types/types';
import { UserSuccessLoginType } from '../types/userTypes';

const checkToken = async (): Promise<boolean> => {
  const { userId, refreshToken, expireOn } = LocalStorage.currUserSettings;
  if (isExpired(expireOn)) {
    if (isExpired(getExpirationDate(refreshToken))) {
      LocalStorage.isAuth = false;
      LocalStorage.setLSData(DEFAULT_USER_NAME, DEFAULT_USER_SETTINGS);
      window.location.replace('/login');
    } else {
      const newTokenData = (await getNewToken(userId, refreshToken)) as UserSuccessLoginType;
      LocalStorage.saveToken(newTokenData.token, newTokenData.refreshToken);
      return true;
    }
  }
  return false;
};

class Model {
  mount = async (): Promise<void> => {
    LocalStorage.initLS(DEFAULT_USER_NAME);
    if (LocalStorage.isAuth) await checkToken();
  };
}

const authFetch = async (url: string, options: RequestOptionType): Promise<Response> => {
  if (await checkToken())
    options.headers.Authorization = `Bearer ${LocalStorage.currUserSettings.token}`; // добавляем токен в headers запроса
  return fetch(url, options); // возвращаем изначальную функцию, но уже с валидным токеном в headers
};

export { Model, authFetch };
