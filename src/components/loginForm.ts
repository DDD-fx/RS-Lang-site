import { createElement } from '../utils/tools';
import history from '../utils/history';
import { LoginFormInterface } from '../types/types';

const loginInner = `
<div class="register__images">
<div class="bubbles img-x5">
<img src="./assets/bubbles.svg" alt="">
</div>
<div class="whale img-x20">
  <img src="./assets/whale.svg" alt="">
</div>
</div>
<form class="form register__form" id="loginForm" name="loginForm" >
<h2 class="register__title">Авторизация</h2>
  <label>
   <span class="input-title">Почта</span>
    <input class="input" type="email" name="email" id="email" placeholder="elon@musk.com" autocomplete="email" required="required" autofocus>
  </label>
  <label>
  <span class="input-title">Пароль</span>
  <input class="input" type="password" name="password" id="password" placeholder="Qweasdzxc123" minlength="8" autocomplete="current-password" required="required">
</label>
  <button class="btn btn-register" type="submit">Вход</button>
  
  <div class="register__link"><span>Нет аккаунта? </span> <a class="register__link-link" href="/auth"> Регистрация </a></div>
</form>
`;

class LoginForm implements LoginFormInterface {
  regForm: HTMLDivElement;

  constructor(handler: (form: HTMLFormElement) => Promise<void>) {
    this.regForm = createElement('div', 'register') as HTMLDivElement;
    this.regForm.innerHTML = loginInner;
    this.bind(handler);
  }

  render = (): HTMLElement => {
    return this.regForm;
  };

  bind = (handler: (form: HTMLFormElement) => Promise<void>): void => {
    this.regForm.addEventListener('click', (event) => {
      if ((<HTMLElement>event.target).classList.contains('register__link-link')) {
        event.preventDefault();
        const anchor = event.target as HTMLAnchorElement;
        const url = anchor.pathname;
        history.push(url);
      }
    });
    this.regForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const form = document.forms.namedItem('loginForm') as HTMLFormElement;
      handler(form).catch((err) => console.error(err));
    });
  };
}

export default LoginForm;
