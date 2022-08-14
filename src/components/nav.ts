import { createElement, getElement } from '../utils/tools';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const navInner = `
<li>
<a href="/" class="btn" data-btn="main"> Главная </a>
</li>
<li>
  <a href="/textbook" class="btn" data-btn="textbook">Учебник</a>
</li>
<li>
  <a href="/games" class="btn" data-btn="games"> Игры </a>
</li>
<li>
  <a href="/stat" class="btn" data-btn="stat"> Статистика </a>
</li>
<li>
  <a href="/login" class="btn inactive" data-btn="login"> Login </a>
</li>
`;

class Nav {
  nav;
  constructor() {
    this.nav = createElement('ul', 'nav__list');
    this.nav.innerHTML = navInner;
    this.bind();
  }
  render = () => {
    getElement('.nav').append(this.nav);
  };
  bind = () => {
    this.nav.addEventListener('click', (event) => {
      event.preventDefault();
      if ((<HTMLElement>event.target).tagName === 'A') {
        const anchor = event.target as HTMLAnchorElement;
        const url = anchor.pathname;
        history.push(url);
      }
    });
  };
}

export { Nav, history };
