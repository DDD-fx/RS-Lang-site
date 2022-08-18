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
import { GamesEntranceModal } from './components/games/gamesModal';


const app = new App();
app.init();

(function textbook() {
  const textBookModel = new TextBookModel();
  // check Auth

  const textBookView = new TextBookView(textBookModel);
  // отрисовка авторизации

  (() => new TextBookController(textBookModel, textBookView))();

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
        new GamesEntranceModal('audiochallenge').render(); 
      },
    },
    {
      path: '/sprint',
      action: () => {
        new GamesEntranceModal('sprint').render(); 
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

