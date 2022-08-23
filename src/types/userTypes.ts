type User = {
  name?: string;
  email: string;
  password: string;
};

type UserLogin = {
  email: string;
  password: string;
};

type UserSuccessLogin = {
  message: 'string';
  token: 'string';
  refreshToken: 'string';
  userId: 'string';
  name: 'string';
};

export { User, UserLogin, UserSuccessLogin };
