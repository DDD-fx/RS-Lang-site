import './styles.scss';
import App from './pages/main/controller';
import Router from './utils/router';
import { getElement } from './utils/tools';
import { Routes } from './types/types';
import { history } from './components/nav';
import { TextBookController } from './pages/textbook/textbookController';
import { TextBookModel } from './pages/textbook/textbookModel';
import { TextBookView } from './pages/textbook/textbookView';
import { GamesSection } from './pages/games/games';
import { GamesEntranceView } from './pages/games/gamesEntrance/gamesEntranceView';
import GamesEntranceController from './pages/games/gamesEntrance/gamesEntranceController';
import { GamesEntranceModel } from './pages/games/gamesEntrance/gamesEntranceModel';
import { AudioChallengeModel } from './pages/games/audioChallengeGame/audioChallengeGameModel';
import { AudioChallengeView } from './pages/games/audioChallengeGame/audioChallengeGameView';
import { AudioChallengeController } from './pages/games/audioChallengeGame/audioChallengeGameController';
import { LocalStorage } from './utils/storage';
import { DEFAULT_USER_NAME } from './utils/constants';

LocalStorage.initLS('' || DEFAULT_USER_NAME);

const app = new App();
app.init();


void (async function textbook() {
  const textBookModel = new TextBookModel();
  await textBookModel.firstLoad();
  // check Auth

  const textBookView = new TextBookView(textBookModel);
  // отрисовка авторизации

  (() => new TextBookController(textBookModel, textBookView))();


  const gamesEntranceModel = new GamesEntranceModel();
  const gamesEntranceView = new GamesEntranceView(gamesEntranceModel);
  (() => new GamesEntranceController(gamesEntranceView, gamesEntranceModel))();

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
      action: () => { // костыли?
        textBookView.drawTextBook();
        // const textBookBtn = document.getElementsByClassName('js-menu-textbook-btn')[0];
        // textBookBtn.addEventListener('click', () => textBookView.drawTextBook());
      },
    },
    {
      path: '/games',
      action: () => {
        new GamesSection().render();
        const challengeBtn = document.getElementsByClassName('games-link__audiochallenge')[0];
        const sprintBtn = document.getElementsByClassName('games-link__sprint')[0];
        challengeBtn.addEventListener('click', () => {
          main.innerHTML = '';
          main.append(gamesEntranceView.buildAudioChallengeHTML());
        });
        sprintBtn.addEventListener('click', () => {
          main.innerHTML = '';
          main.append(gamesEntranceView.buildSprintHTML());
        });
      }
    },
    {
      path: '/audiochallenge',
      action: () => {
        main.append(gamesEntranceView.buildAudioChallengeHTML());
      },
    },
    {
      path: '/sprint',
      action: () => {
        main.append(gamesEntranceView.buildSprintHTML());
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
})();
