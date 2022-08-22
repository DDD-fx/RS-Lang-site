import { createElement } from '../utils/tools';
import { history } from './nav';

const loginInner = `
<div class="register__images">
<div class="bubbles img-x5">
<img src="./assets/bubbles.svg" alt="">
</div>
<div class="whale img-x20">
  <img src="./assets/whale.svg" alt="">
</div>
</div>
<form class="form register__form" id="loginForm" name="loginForm">
<h2 class="register__title">Авторизация</h2>
  <label>
   <span class="input-title">Почта</span>
    <input class="input" type="email" name="email" id="email" placeholder="elon@musk.com" autocomplete="on" required="required" autofocus>
  </label>
  <label>
  <span class="input-title">Пароль</span>
  <input class="input" type="password" name="pass" id="pass" placeholder="Qweasdzxc123" minlength="8" autocomplete="new-password" required="required">
</label>
  <button class="btn btn-register" type="submit">Вход</button>
  
  <div class="register__link"><span>Нет аккаунта? </span> <a class="register__link-link" href="/auth"> Регистрация </a></div>
</form>
`;

class LoginForm {
  regForm;

  constructor(handler: (form: HTMLFormElement) => void) {
    this.regForm = createElement('div', 'register');
    this.regForm.innerHTML = loginInner;
    this.bind(handler);
  }

  render = () => {
    return this.regForm; //getElement(parent).append(this.nav);
  };

  bind = (handler: (form: HTMLFormElement) => void) => {
    this.regForm.addEventListener('click', (event) => {
      event.preventDefault();

      if ((<HTMLElement>event.target).classList.contains('btn-register')) {
        const form = document.forms.namedItem('loginForm') as HTMLFormElement;
        handler(form);
      }

      if ((<HTMLElement>event.target).classList.contains('register__link-link')) {
        const anchor = event.target as HTMLAnchorElement;
        const url = anchor.pathname;
        history.push(url);
      }
    });
  };
}

export default LoginForm;
