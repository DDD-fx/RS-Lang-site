import './styles.scss';
import App from './pages/main/controller';
import Router from './utils/router';
import { getElement } from './utils/tools';
import { Routes } from './types/types';
import { TextBookController } from './pages/textbook/textbookController';
import { GamesSection } from './pages/games/games';
import GamesEntranceController from './pages/games/gamesEntrance/gamesEntranceController';
import Statistics from './pages/stat';
import { LocalStorage } from './utils/storage';
import { DEFAULT_USER_NAME, DEFAULT_USER_SETTINGS } from './utils/constants';
import history from './utils/history';
import Nav from './components/nav';
import Login from './pages/login/loginController';

const app = new App();
app.init();

const login = new Login();

const textbook = new TextBookController();

const gamesEntrance = new GamesEntranceController();

const gamesSection = new GamesSection();

const stat = new Statistics()

const main = getElement('main__wrapper');

const routes: Routes[] = [
  {
    path: '',
    action: () => {
      app.view.renderMainTemplate();
    },
  },
  {
    path: '/textbook',
    action: async () => {
      await textbook.init();
    },
  },
  {
    path: '/games',
    action: () => {
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
      stat.init();
    },
  },
  {
    path: '/login',
    action: () => {
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
      login.view.renderRegForm();
    },
  },
];
new Router(routes).render(history.location).catch((err) => console.error(err));
