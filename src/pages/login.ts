import Model from '../model/model';
import { getElement } from '../utils/tools';
import LoginForm from '../components/loginForm';
import RegForm from '../components/registerForm';

class Login {

  model: Model;

  constructor() {
    this.model = new Model();

  }

  init = () => {

  };

  renderLoginForm = () => {
    const mainWrapper = getElement('main__wrapper');
    const loginForm = new LoginForm(); 
    mainWrapper.innerHTML = '';
    mainWrapper.append(loginForm.render());
  };

  renderRegForm = () => {
    const mainWrapper = getElement('main__wrapper');
    const regForm = new RegForm(); 
    mainWrapper.innerHTML = '';
    mainWrapper.append(regForm.render());
  };

}

export default Login;