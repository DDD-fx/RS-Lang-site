import { getElement, createElement } from '../../utils/tools';
import LoginForm from '../../components/loginForm';
import RegForm from '../../components/registerForm';

type Handler = (form: HTMLFormElement) => Promise<void>;

class LoginView {
  handleLogin;

  handleAuth;

  constructor(handleLogin: Handler, handleAuth: Handler) {
    this.handleLogin = handleLogin;
    this.handleAuth = handleAuth;
  }

  renderLoginForm = (): void => {
    // const modal = createElement('div', 'modal');
    const mainWrapper = getElement('main__wrapper');
    const loginForm = new LoginForm(this.handleLogin);
    mainWrapper.innerHTML = '';
    mainWrapper.append(loginForm.render());
    // getElement('main').append(modal);
  };

  renderRegForm = (): void => {
    const mainWrapper = getElement('main__wrapper');
    const regForm = new RegForm(this.handleAuth);
    mainWrapper.innerHTML = '';
    mainWrapper.append(regForm.render());
  };
}

export default LoginView;
