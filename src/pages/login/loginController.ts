import LoginView from './loginView';
import { showModal } from '../../utils/tools';
import { createUser, loginUser } from '../../model/api/usersApi';
import { UserSuccessLogin } from '../../types/userTypes';
import { LocalStorage } from '../../utils/storage';
import { UserSettingsType } from '../../types/types';
import { history } from '../../components/nav';

class Login {
  view: LoginView;

  constructor() {
    this.view = new LoginView(this.loginHandler, this.authHandler);
  }

  loginHandler = async (form: HTMLFormElement) => {
    //типизировать form!
    if (form.email.value.length === 0) showModal('Введите почту!');
    else if (form.pass.value.length < 8) showModal('Пароль более 8 символов!');
    else {
      const userData = {
        email: form.email.value,
        password: form.pass.value,
      };
      const response = (await loginUser(userData)) as [number, UserSuccessLogin]; //типизировать нормальнО!
      if (response[0] === 200) {
        showModal('Успешная регистрация!');

        const { token, refreshToken, userId, name } = response[1];
        const loginUserSettings: UserSettingsType = {
          userEmail: userData.email,
          userName: name,
          avatarURL: '',
          token: token,
          refreshToken: refreshToken,
          stats: '',
          currPage: LocalStorage.currUserSettings.currPage,
          currGroup: LocalStorage.currUserSettings.currGroup,
          currWord: LocalStorage.currUserSettings.currWord,
        };
        LocalStorage.currUserSettings = loginUserSettings;
        LocalStorage.setLSData(LocalStorage.currUserID, loginUserSettings);
        history.push('/');
      } else showModal('Неверный логин или пароль!');
    }

    //val@val.com, qweasdzxc
  };

  authHandler = async (form: HTMLFormElement) => {
    //типизировать form!
    if (form.email.value.length === 0) showModal('Введите почту!');
    else if (form.pass.value.length < 8) showModal('Пароль более 8 символов!');
    else {
      const userData = {
        name: form.login.value,
        email: form.email.value,
        password: form.pass.value,
      };
      const response = (await createUser(userData)) as [
        number,
        { error: { status: 'failed'; errors: [{ path: [string]; message: string }] } },
      ]; //типизировать нормальнО!
      if (response[0] === 200) {
        showModal('Успешная регистрация!');
        history.push('/login');
      } else showModal(response[1].error.errors[0].message);
    }
  };
}

export default Login;
