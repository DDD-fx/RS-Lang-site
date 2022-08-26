import { DEFAULT_USER_NAME, DEFAULT_USER_SETTINGS } from './constants';
import { UserSettingsType } from '../types/types';
import { getExpirationDate } from '../model/api/usersApi';

export class LocalStorage {
  static createLocalKey = (key: string) => `rsl13-${key}`;

  static loadData = async <T>(url: string): Promise<T> =>
    fetch(url).then((response): Promise<T> => response.json()); //delete if no local .json items

  static setLSData = <T>(key: string, value: T) => {
    const stringData = JSON.stringify(value);
    window.localStorage.setItem(LocalStorage.createLocalKey(key), stringData);
  };

  static removeLSData = (key: string) => {
    window.localStorage.removeItem(LocalStorage.createLocalKey(key));
  };

  static getLSData = (key: string): UserSettingsType => {
    const userSettings: string | null = window.localStorage.getItem(
      LocalStorage.createLocalKey(key),
    );
    if (userSettings) return <UserSettingsType>JSON.parse(userSettings);

    const defaultUserSettings: string | null = window.localStorage.getItem(
      LocalStorage.createLocalKey(DEFAULT_USER_NAME),
    );
    if (defaultUserSettings) return <UserSettingsType>JSON.parse(defaultUserSettings);

    return DEFAULT_USER_SETTINGS;
  };

  static initLS = (userID: string): void => {
    const userSettings = LocalStorage.getLSData(LocalStorage.createLocalKey(userID));

    LocalStorage.currUserID = userID;
    LocalStorage.currUserSettings = userSettings;

    // если дефолтный юзер уже создан и что-то тыкал в учебнике
    if (
      userID === DEFAULT_USER_NAME &&
      JSON.stringify(userSettings) === JSON.stringify(DEFAULT_USER_SETTINGS)
    ) {
      // LocalStorage.createLocalKey(DEFAULT_USER_NAME); //эта строчка лишняя
      LocalStorage.setLSData(DEFAULT_USER_NAME, DEFAULT_USER_SETTINGS);
    }
    if (LocalStorage.currUserSettings.token !== '') LocalStorage.isAuth = true;
  };

  static saveToken = (token: string, refreshToken: string): void => {
    LocalStorage.currUserSettings.token = token;
    LocalStorage.currUserSettings.refreshToken = refreshToken;
    LocalStorage.currUserSettings.expireOn = getExpirationDate(token) - 300000;
    LocalStorage.setLSData(DEFAULT_USER_NAME, LocalStorage.currUserSettings);
  };

  static currUserID = '';

  static isAuth = false;

  static currUserSettings = DEFAULT_USER_SETTINGS;
}

// export { setLSData, getLSData, removeLSData, loadData, initLS };
