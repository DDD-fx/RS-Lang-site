import { createElement, getElement } from '../utils/tools';
import { LocalStorage } from '../utils/storage';
import history from '../utils/history';

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
${isAuthorized ? logOut : logIn}
</ul>
</nav>
<!--<div class="shadow"></div>-->
<div class="hamburger" id="hamburger-1">
<span class="line"></span> 
<span class="line"></span> 
<span class="line"></span>
</div>
`;

class Nav {
  nav;

  parent;

  constructor(parent: HTMLElement) {
    this.nav = createElement('div', ['wrapper', 'header__wrapper']);
    this.parent = parent;
    this.bind();
  }

  render = () => {
    const isAuthorized = LocalStorage.isAuth;
    this.nav.innerHTML = navInner(isAuthorized);
    this.parent.innerHTML = '';
    this.parent.append(this.nav);
  };

  bind = () => {
    this.nav.addEventListener('click', (event) => {
      event.preventDefault();

      if (
        (<HTMLElement>event.target).classList[0] === 'hamburger' ||
        (<HTMLElement>event.target).classList[0] === 'line'
      )
        this.openNav();
      const anchor = (<HTMLElement>event.target).closest('a') as HTMLAnchorElement;
      if (anchor) {
        const url = anchor.pathname;
        history.push(url);
      }
    });
  };

  openNav = () => {
    getElement('hamburger').classList.toggle('is-active');
    getElement('nav').classList.toggle('is-active');
  };
  /*
 closeNav = (event) => {
     const target = event.target;
    const its_menu = target == siteNav;
    const its_btnMenu = target == burgerButton || burgerButton.contains(target);
    const menu_is_active = nav.classList.contains("is-active");
   
  if (menu_is_active && !its_btnMenu && !its_menu){ //Close menu onclick all elem except nav_list
    burgerButton.classList.remove("is-active");
    nav.classList.remove("is-active");
   }
  }*/
}

export default Nav;
