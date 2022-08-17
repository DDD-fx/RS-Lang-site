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

const app = new App();
app.init();

(function textbook() {
  const textBookModel = new TextBookModel();
  // check Auth

  const textBookView = new TextBookView(textBookModel);
  textBookView.createTextBookBtn();
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
      action: () => {
        textBookView.drawTextBook();  //было new Textbook.render()
      },
    },
    {
      path: '/games',
      action: () => {
        main.innerHTML = `
      <h1>Page Games</h1>
      <div class="img-x5">
      <img src="./assets/bubbles.svg" alt="">
    </div>
  `;
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
})();

