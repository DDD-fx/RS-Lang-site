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
<form class="form register__form" id="registerForm" name="registerForm" action="/apply/" method="POST">
<h2 class="register__title">Создать аккаунт</h2>
  <label>
 <span class="input-title">Ваше имя</span>
    <input class="input" type="text" name="username" id="username" placeholder="Илон Маск" autocomplete="username" autofocus>
  </label>
  <label>
   <span class="input-title">Почта*</span>
    <input class="input" type="email" name="email" id="email" placeholder="elon@musk.com" autocomplete="email" required="required">
  </label>
  <label>
  <span class="input-title">Пароль*</span>
  <input class="input" type="password" name="password" id="password" placeholder="Qweasdzxc123" minlength="8" autocomplete="new-password" required="required">
</label>
  <button class="btn btn-register" type="submit" >Регистрация</button>
  
  <div class="register__link"><span>Есть аккаунт? </span><a class="register__link-link" href="/login"> Войти </a></div>
</form>
`;

class RegForm {
  regForm;

  constructor(handler: (form: HTMLFormElement) => Promise<void>) {
    this.regForm = createElement('div', 'register');
    this.regForm.innerHTML = registerInner;
    this.bind(handler);
  }

  render = () => {
    return this.regForm;
  };

  bind = (handler: (form: HTMLFormElement) => Promise<void>) => {
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
      console.log(<HTMLElement>event.target);
      const form = document.forms.namedItem('registerForm') as HTMLFormElement;
      handler(form).catch((err) => console.error(err));
    });
  };
}

export default RegForm;
