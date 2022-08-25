import { LocalStorage } from './../utils/storage';
import { DEFAULT_USER_NAME, DEFAULT_USER_SETTINGS } from './../utils/constants';
import { getNewToken, getExpirationDate, isExpired } from './api/usersApi';
import { ResponseOptionType } from '../types/types';
import { UserSuccessLoginType } from '../types/userTypes';

const checkToken = async (): Promise<void> => {
  const { userId, refreshToken, expireOn } = LocalStorage.currUserSettings;
  if (isExpired(getExpirationDate(refreshToken) as number)) {
    // если истёк refresh token то заново авторизоваться надо

    LocalStorage.isAuth = false;
    LocalStorage.setLSData(DEFAULT_USER_NAME, DEFAULT_USER_SETTINGS);
    console.log(LocalStorage.isAuth);
  } else if (isExpired(expireOn)) {
    const newTokenData = (await getNewToken(userId, refreshToken)) as UserSuccessLoginType;
    LocalStorage.saveToken(newTokenData.token, newTokenData.refreshToken);
  }
};

class Model {
  mount = async (): Promise<void> => {
    LocalStorage.initLS('' || DEFAULT_USER_NAME);
    if (LocalStorage.isAuth) await checkToken();
  };
}

export const authFetch = async (url: string, options: ResponseOptionType): Promise<Response> => {
  await checkToken();
  options.headers.Authorization = `Bearer ${LocalStorage.currUserSettings.token}`; // добавляем токен в headers запроса
  return fetch(url, options); // возвращаем изначальную функцию, но уже с валидным токеном в headers
};

export default Model;

// test expired refreshtoken eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDNlYzQ4ZTZkZGQ4MDAxNmU1NmZkZCIsInRva2VuSWQiOiJkZGZmMGNiMy1iZThhLTRkMTYtYmU4ZS03ZWM0MzMyMjRmODEiLCJpYXQiOjE2NjEzNzMwNDcsImV4cCI6MTY2MTM4OTI0N30._UViJPL0Dx_NmfbLb5Mgc7KcY5U5e6zn-aG5w38vppY

/* const testnewTokenData = (await getNewToken(
    '6303ec48e6ddd80016e56fdd',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDNlYzQ4ZTZkZGQ4MDAxNmU1NmZkZCIsInRva2VuSWQiOiJkZDk5MGExNi1kNWI5LTRjNDUtOTgzZC0wMDdjYTNhNjNjZWIiLCJpYXQiOjE2NjE0MzMyOTcsImV4cCI6MTY2MTQ0OTQ5N30.YCGoEGa8I46s9Vp_XB3Oey1O2-oKWc7NpCeuCkd-zac',
  )) as UserSuccessLoginType;
  console.log(testnewTokenData);*/
//  LocalStorage.currUserSettings.refreshToken = ''
