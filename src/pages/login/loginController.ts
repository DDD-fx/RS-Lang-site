import LoginView from './loginView';
import { showModal } from '../../utils/tools';
import { createUser, loginUser, getExpirationDate } from '../../model/api/usersApi';
import { UserSuccessLoginType, CreateUserResponseType } from '../../types/userTypes';
import { LocalStorage } from '../../utils/storage';
import { UserSettingsType } from '../../types/types';
import history from '../../index';
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
        history.push('/');
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
        //window.location.replace('/login')
        history.push('/login');
      } else showModal(response[1].error.errors[0].message);
    }
  };

  setUserSettings = (email: string, responseData: UserSuccessLoginType): void => {
    const { token, refreshToken, userId, name } = responseData;
    const expireOn = getExpirationDate(token) as number;
    const loginUserSettings: UserSettingsType = {
      userEmail: email,
      userName: name,
      avatarURL: '',
      token: token,
      refreshToken: refreshToken,
      expireOn: expireOn,
      currPage: LocalStorage.currUserSettings.currPage,
      currGroup: LocalStorage.currUserSettings.currGroup,
      currWord: LocalStorage.currUserSettings.currWord,
      userId: userId,
    };
    LocalStorage.isAuth = true;
    LocalStorage.currUserSettings = loginUserSettings;
    LocalStorage.setLSData(LocalStorage.currUserID, loginUserSettings);
  };
}

export default Login;
