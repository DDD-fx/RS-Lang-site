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

export { Routes, HistoryLocation, RequestOptionType };

export type LocalStorageType = {
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

type RequestOptionType = {
  method: string;
  withCredentials?: boolean;
  headers: RequestOptionHeadersType;
  body?: string;
};

type RequestOptionHeadersType = {
  Authorization: string;
  Accept?: string;
  'Content-Type'?: string;
};
