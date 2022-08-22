import { createElement } from '../utils/tools';
import { createBrowserHistory } from 'history';
import { DEFAULT_USER_NAME } from '../utils/constants';
import { LocalStorage } from '../utils/storage';
const history = createBrowserHistory();

const logIn = `<a href="/login"><button class="btn btn-login" data-btn="login"> Войти </button></a>`;
const logOut = `<a href="/logout"><button class="btn btn-logout " data-btn="login"> Выйти </button></a>`;

const navInner = (isAuthorized: boolean) => `
<a href="/"><h1>RS Lang</h1></a>
<nav class="nav">
<ul class="nav__list">
<li>
<a href="/"><button class="btn" data-btn="main"> Главная </button></a>
</li>
<li>
  <a href="/textbook"><button class="btn js-menu-textbook-btn" data-btn="textbook"> Учебник </button></a>
</li>
<li>
  <a href="/games" ><button class="btn" data-btn="games"> Миниигры </button></a>
</li>
<li>
  <a href="/stat"><button  class="btn" data-btn="stat"> Статистика </button></a>
</li>
<li>
${isAuthorized ? logIn : logOut}
</ul>
</nav>
`;

class Nav {
  nav;

  constructor() {
    this.nav = createElement('div', ['wrapper', 'header__wrapper']);

    this.bind();
  }

  render = () => {
    const isAuthorized = LocalStorage.getLSData(DEFAULT_USER_NAME).token === '';
    this.nav.innerHTML = navInner(isAuthorized);
    return this.nav; //getElement(parent).append(this.nav);
  };

  bind = () => {
    this.nav.addEventListener('click', (event) => {
      event.preventDefault();
      const anchor = (<HTMLElement>event.target).closest('a') as HTMLAnchorElement;
      if (anchor) {
        const url = anchor.pathname;
        history.push(url);
      }
    });
  };
}

export { Nav, history };
