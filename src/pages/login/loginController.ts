import LoginView from './loginView';
import { showModal } from '../../utils/tools';
import { createUser, loginUser, getExpirationDate } from '../../model/api/usersApi';
import { UserSuccessLoginType, CreateUserResponseType } from '../../types/userTypes';
import { LocalStorage } from '../../utils/storage';
import history from '../../utils/history';
import Nav from '../../components/nav';
import { getElement } from '../../utils/tools';

class Login {
  view: LoginView;

  constructor() {
    this.view = new LoginView(this.loginHandler, this.authHandler);
  }

  loginHandler = async (form: HTMLFormElement): Promise<void> => {
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;
    if (email.length === 0) showModal('Введите почту!');
    else if (password.length < 8) showModal('Пароль более 8 символов!');
    else {
      const userData = {
        email: email,
        password: password,
      };
      const response = (await loginUser(userData)) as [number, UserSuccessLoginType];
      if (response[0] === 200) {
        showModal('Успешная авторизация!');
        this.setUserSettings(userData.email, response[1]);
        window.location.replace('/');
        //  history.push('/');
        new Nav(getElement('header') as HTMLElement).render();
      } else showModal('Неверный логин или пароль!');
    }
  };

  authHandler = async (form: HTMLFormElement): Promise<void> => {
    const name = (form.username as HTMLInputElement).value;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;
    if (email.length === 0) showModal('Введите почту!');
    else if (password.length < 8) showModal('Пароль более 8 символов!');
    else {
      const userData = {
        name: name,
        email: email,
        password: password,
      };
      const response = (await createUser(userData)) as [number, CreateUserResponseType];
      if (response[0] === 200) {
        showModal('Успешная регистрация!');
        // window.location.replace('/login')
        history.push('/login');
      } else showModal(response[1].error.errors[0].message);
    }
  };

  setUserSettings = (email: string, responseData: UserSuccessLoginType): void => {
    const { token, refreshToken, userId, name } = responseData;
    const expireOn = (getExpirationDate(token) - 300000) as number;
    LocalStorage.currUserSettings.userId = userId;
    LocalStorage.currUserSettings.userEmail = email;
    LocalStorage.currUserSettings.userName = name;
    LocalStorage.currUserSettings.token = token;
    LocalStorage.currUserSettings.refreshToken = refreshToken;
    LocalStorage.currUserSettings.expireOn = expireOn;

    LocalStorage.isAuth = true;
    LocalStorage.setLSData(LocalStorage.currUserID, LocalStorage.currUserSettings);
  };
}

export default Login;
