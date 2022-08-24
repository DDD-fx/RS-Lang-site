import { getElement } from '../../utils/tools';
import LoginForm from '../../components/loginForm';
import RegForm from '../../components/registerForm';

type handler = (form: HTMLFormElement) => void;

class LoginView {
  handleLogin;
  handleAuth;
  constructor(handleLogin: handler, handleAuth: handler) {
    this.handleLogin = handleLogin;
    this.handleAuth = handleAuth;
  }
  renderLoginForm = () => {
    const mainWrapper = getElement('main__wrapper');
    const loginForm = new LoginForm(this.handleLogin);
    mainWrapper.innerHTML = '';
    mainWrapper.append(loginForm.render());
  };

  renderRegForm = () => {
    const mainWrapper = getElement('main__wrapper');
    const regForm = new RegForm(this.handleAuth);
    mainWrapper.innerHTML = '';
    mainWrapper.append(regForm.render());
  };
}

export default LoginView;
