import LoginView from '../pages/login/loginView';
import { StatOptionalDayType, StatStateType, UserSuccessLoginType } from './userTypes';
import View from '../pages/main/view';

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

export interface LoginFormInterface {
  regForm: HTMLDivElement;
  render(): HTMLElement;
  bind(handler: (form: HTMLFormElement) => Promise<void>): void;
}

export interface NavInterface {
  nav: HTMLDivElement;
  parent: HTMLElement;
  render(): void;
  bind(): void;
  openNav(): void;
  closeNav(event: Event): void;
}

export interface RegFormInterface {
  regForm: HTMLDivElement;
  render(): HTMLElement;
  bind(handler: (form: HTMLFormElement) => Promise<void>): void;
}

export interface GamesSectionInterface {
  render(): void;
  mount(): void;
}

export interface LoginInterface {
  view: LoginView;
  loginHandler(form: HTMLFormElement): Promise<void>;
  authHandler(form: HTMLFormElement): Promise<void>;
  setUserSettings(email: string, responseData: UserSuccessLoginType): void;
}

export interface LoginViewInterface {
  handleLogin: Handler;
  handleAuth: Handler;
  renderLoginForm(): void;
  renderRegForm(): void;
}

export type Handler = (form: HTMLFormElement) => Promise<void>;

export interface AppInterface {
  view: View;
  model: ModelInterface;
  init(): void;
}

export interface ModelInterface {
  mount(): Promise<void>;
}

export interface ViewInterface {
  header: HTMLElement;
  main: HTMLElement;
  mainWrapper: HTMLElement;
  footer: HTMLElement;
  nav: NavInterface;
  render(): void;
  renderMainTemplate(): void;
  renderCustomTemplate(template: () => string): void;
  renderPreloader(someClass?: string): void;
  bind(): void;
}

export interface StatModelInterface {
  state: StatStateType;
  mount(): Promise<void>;
  getStatData(): Promise<void>;
}

export interface StatisticsViewInterface {
  render(dayData?: StatOptionalDayType): void;
  bind(): void;
}

export interface StatisticsInterface {
  view: StatisticsViewInterface;
  model: StatModelInterface;
  init(): Promise<void>;
}
