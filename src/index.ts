import './styles.scss';
import App from './pages/main/controller';
import Router from './utils/router';
import { getElement } from './utils/tools';
import { Routes } from './types/types';
import { TextBookController } from './pages/textbook/textbookController';
import { GamesSection } from './pages/games/games';
import GamesEntranceController from './pages/games/gamesEntrance/gamesEntranceController';
import { LocalStorage } from './utils/storage';
import { DEFAULT_USER_NAME, DEFAULT_USER_SETTINGS } from './utils/constants';
import history from './history';
import Nav from './components/nav';
import Login from './pages/login/loginController';

const app = new App();
app.init();

const login = new Login();

const gamesEntrance = new GamesEntranceController();

const main = getElement('main__wrapper');

const routes: Routes[] = [
  {
    path: '',
    action: () => {
      app.view.renderMain();
    },
  },
  {
    path: '/textbook',
    action: async () => {
      (() => new TextBookController().init())();
    },
  },
  {
    path: '/games',
    action: () => {
      const gamesSection = new GamesSection();
      gamesSection.render();
      gamesSection.mount();
    },
  },
  {
    path: '/audiochallenge',
    action: () => {
      main.innerHTML = '';
      main.append(gamesEntrance.gamesEntranceView.buildAudioChallengeHTML());
    },
  },
  {
    path: '/sprint',
    action: () => {
      main.innerHTML = '';
      main.append(gamesEntrance.gamesEntranceView.buildSprintHTML());
    },
  },
  {
    path: '/stat',
    action: () => {
      main.innerHTML = '<h1>Page Statistics</h1>';
    },
  },
  {
    path: '/login',
    action: () => {
    //  const login = new Login();
      login.view.renderLoginForm();
    },
  },
  {
    path: '/logout',
    action: () => {
      LocalStorage.setLSData(DEFAULT_USER_NAME, DEFAULT_USER_SETTINGS);
      LocalStorage.isAuth = false;
      window.location.replace('/');
      new Nav(getElement('header') as HTMLElement).render();
    },
  },
  {
    path: '/auth',
    action: () => {
     // const login = new Login();
      login.view.renderRegForm();
    },
  },
];
new Router(routes).render(history.location).catch((err) => console.error(err));
