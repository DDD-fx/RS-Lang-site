type Routes = {
  path: string;
  action: () => void;
};

type HistoryLocation = {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: null | unknown;
};

export { Routes, HistoryLocation, ResponseOptionType };

export type LocalStorageType = {
  // это зачем ?
  userId: UserSettingsType;
};

export type UserSettingsType = {
  userEmail: string;
  userName: string;
  avatarURL: string;
  token: string;
  refreshToken: string;
  expireOn: number;
  currPage: number;
  currGroup: number;
  currWord: string;
  userId: string;
};

type ResponseOptionType = {
  method: string;
  withCredentials: boolean;
  headers: ResponseOptionHeadersType;
  body?: string;
};

type ResponseOptionHeadersType = {
  Authorization: string;
  Accept?: string;
  'Content-Type'?: string;
};
