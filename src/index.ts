import './styles.scss';
import App from './pages/main/controller';
import Textbook from './pages/textbook';
import Router from './utils/router';
import { getElement } from './utils/tools';
import { Routes } from './types/types';
import { history } from './components/nav';
import { GamesSection } from './pages/games/games';

const app = new App();
app.init();

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
    action: () => {
      new Textbook().render();
    },
  },
  {
    path: '/games',
    action: () => {
      new GamesSection().render();
    },
  },
  {
    path: '/audiochallenge',
    action: () => {
      main.innerHTML = '<h1>Not Found</h1>';
    },
  },
  {
    path: '/sprint',
    action: () => {
      main.innerHTML = '<h1>Not Found</h1>';
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
      main.innerHTML = '<h1>Not Found</h1>';
    },
  },
];

new Router(routes).render(history.location).catch((err) => console.error(err));
