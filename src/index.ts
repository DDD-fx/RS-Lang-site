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


const app = new App();
app.init();

(function textbook() {
  const textBookModel = new TextBookModel();
  // check Auth

  const textBookView = new TextBookView(textBookModel);
  // отрисовка авторизации

  (() => new TextBookController(textBookModel, textBookView))();

  const gamesEntranceModel = new GamesEntranceModel();
  const gamesEntranceView = new GamesEntranceView(gamesEntranceModel);
  (() => new GamesEntranceController(gamesEntranceView, gamesEntranceModel))();

  const audioChallengeModel = new AudioChallengeModel();
  const audioChallengeView = new AudioChallengeView(audioChallengeModel);
  (() => new AudioChallengeController(audioChallengeModel, audioChallengeView))();

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
      action: () => { //прогружает только при клике. При рефреше - нет
        textBookView.drawTextBook();  //было new Textbook.render()
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
        main.append(gamesEntranceView.buildAudioChallengeHTML());
        const startAudioChallengeBtn = document.getElementsByClassName('game-start-btn_audio-challenge')[0];
        const audioChallengeModel = new AudioChallengeModel();
        const audioChallengeView = new AudioChallengeView(audioChallengeModel);
        startAudioChallengeBtn.addEventListener('click', () => audioChallengeView.drawAudioChallengeGame());
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

console.log(document.getElementsByClassName('js-menu-textbook-btn')[0]);