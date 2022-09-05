import { getElement } from '../../utils/tools';
import LoginForm from '../../components/loginForm';
import RegForm from '../../components/registerForm';
import { Handler, LoginViewInterface } from '../../types/types';

class LoginView implements LoginViewInterface {
  handleLogin;

  handleAuth;

  constructor(handleLogin: Handler, handleAuth: Handler) {
    this.handleLogin = handleLogin;
    this.handleAuth = handleAuth;
  }

  renderLoginForm = (): void => {
    const mainWrapper = getElement('main__wrapper');
    const loginForm = new LoginForm(this.handleLogin);
    mainWrapper.innerHTML = '';
    mainWrapper.append(loginForm.render());
  };

  renderRegForm = (): void => {
    const mainWrapper = getElement('main__wrapper');
    const regForm = new RegForm(this.handleAuth);
    mainWrapper.innerHTML = '';
    mainWrapper.append(regForm.render());
  };
}

export default LoginView;
