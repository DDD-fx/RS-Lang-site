import './styles.scss';
import MainController from './pages/main/mainController';
import Router from './utils/router';
import { getElement } from './utils/tools';
import { Routes } from './types/types';
import { TextBookController } from './pages/textbook/textbookController';
import { GamesSection } from './pages/games/games';
import GamesEntranceController from './pages/games/gamesEntrance/gamesEntranceController';
import Statistics from './pages/stat/statController';
import { LocalStorage } from './utils/storage';
import { BASE_HREF, DEFAULT_USER_NAME, DEFAULT_USER_SETTINGS } from './utils/constants';
import history from './utils/history';
import Nav from './components/nav';
import Login from './pages/login/loginController';
import { GameEnum } from './types/enums';

const app = new MainController();
app.init();

const title = '| rs lang';

const login = new Login();

const textbook = new TextBookController();

const gamesEntrance = new GamesEntranceController();

const gamesSection = new GamesSection();

const stat = new Statistics();

const main = getElement('main__wrapper');

const routes: Routes[] = [
  {
    path: BASE_HREF,
    action: () => {
      app.view.renderPreloader();
      app.view.renderMainTemplate();
      document.title = `Главная ${title}`;
    },
  },
  {
    path: `${BASE_HREF}/textbook`,
    action: () => {
      app.view.renderPreloader('textbook');
      textbook.init().catch((err) => console.error(err));
      document.title = `Учебник ${title}`;
    },
  },
  {
    path: `${BASE_HREF}/games`,
    action: () => {
      app.view.renderPreloader();
      gamesSection.render();
      gamesSection.mount();
      document.title = `Миниигры ${title}`;
    },
  },
  {
    path: `${BASE_HREF}/audiochallenge`,
    action: () => {
      app.view.renderPreloader();
      main.innerHTML = '';
      main.append(gamesEntrance.gamesEntranceView.buildAudioChallengeHTML());
      document.title = `Игра Аудиовызов ${title}`;
    },
  },

  {
    path: `${BASE_HREF}/audiochallenge-pages`,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    action: async () => {
      app.view.renderPreloader();
      const collection = await textbook.getGamesWordCollection(GameEnum.audioChallenge);
      gamesEntrance.startAudioChallengeFromTextBook(collection).catch((err) => console.error(err));
      document.title = `Игра Аудиовызов ${title}`;
    },
  },

  {
    path: `${BASE_HREF}/sprint`,
    action: () => {
      app.view.renderPreloader();
      main.innerHTML = '';
      main.append(gamesEntrance.gamesEntranceView.buildSprintHTML());
      document.title = `Игра Спринт ${title}`;
    },
  },
  {
    path: `${BASE_HREF}/sprint-pages`,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    action: async () => {
      app.view.renderPreloader();
      const collection = await textbook.getGamesWordCollection(GameEnum.sprint);
      await gamesEntrance.startSprintGameFromTextBook(collection);
      document.title = `Игра Спринт ${title}`;
    },
  },

  {
    path: `${BASE_HREF}/stat`,
    action: () => {
      app.view.renderPreloader();
      stat.init().catch((err) => console.error(err));
      document.title = `Статистика ${title}`;
    },
  },
  {
    path: `${BASE_HREF}/login`,
    action: () => {
      app.view.renderPreloader();
      login.view.renderLoginForm();
      document.title = `Авторизация ${title}`;
    },
  },
  {
    path: `${BASE_HREF}/logout`,
    action: () => {
      LocalStorage.setLSData(DEFAULT_USER_NAME, DEFAULT_USER_SETTINGS);
      LocalStorage.isAuth = false;
      window.location.replace(`${BASE_HREF}/`);
      new Nav(getElement('header') as HTMLElement).render();
      document.title = `Выход ${title}`;
    },
  },
  {
    path: `${BASE_HREF}/auth`,
    action: () => {
      login.view.renderRegForm();
      document.title = `Регистрация ${title}`;
    },
  },
];
new Router(routes).render(history.location).catch((err) => console.error(err));
