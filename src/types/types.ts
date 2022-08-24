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

export { Routes, HistoryLocation };

export type LocalStorageType = {
  userId: UserSettingsType;
};

export type UserSettingsType = {
  userEmail: string;
  userName: string;
  avatarURL: string;
  token: string;
  refreshToken: string;
  //stats: string; //obj?
  currPage: number;
  currGroup: number;
  currWord: string;
  userId: string;
};
