import { createElement } from '../utils/tools';
import history from '../index';

const registerInner = `
<div class="register__images">
<div class="bubbles img-x5">
<img src="./assets/bubbles.svg" alt="">
</div>
<div class="whale img-x20">
  <img src="./assets/whale.svg" alt="">
</div>
</div>
<form class="form register__form" id="registerForm" name="registerForm">
<h2 class="register__title">Создать аккаунт</h2>
  <label>
 <span class="input-title">Ваше имя</span>
    <input class="input" type="text" name="login" id="name" placeholder="Илон Маск" autocomplete="on" autofocus>
  </label>
  <label>
   <span class="input-title">Почта*</span>
    <input class="input" type="email" name="email" id="email" placeholder="elon@musk.com" autocomplete="on" required="required">
  </label>
  <label>
  <span class="input-title">Пароль*</span>
  <input class="input" type="password" name="pass" id="pass" placeholder="Qweasdzxc123" minlength="8" autocomplete="new-password" required="required">
</label>
  <button class="btn btn-register" type="submit">Регистрация</button>
  
  <div class="register__link"><span>Есть аккаунт? </span><a class="register__link-link" href="/login"> Войти </a></div>
</form>
`;

class RegForm {
  regForm;

  constructor(handler: (form: HTMLFormElement) => void) {
    this.regForm = createElement('div', 'register');
    this.regForm.innerHTML = registerInner;
    this.bind(handler);
  }

  render = () => {
    return this.regForm;
  };

  bind = (handler: (form: HTMLFormElement) => void) => {
    this.regForm.addEventListener('click', (event) => {
      event.preventDefault();
      if ((<HTMLElement>event.target).classList.contains('btn-register')) {
        const form = document.forms.namedItem('registerForm') as HTMLFormElement;
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

export default RegForm;
