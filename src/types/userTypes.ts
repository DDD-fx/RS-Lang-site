type CreateUserType = {
  name?: string;
  email: string;
  password: string;
};

type UserLoginType = {
  email: string;
  password: string;
};

type UserSuccessLoginType = {
  message: 'string';
  token: 'string';
  refreshToken: 'string';
  userId: 'string';
  name: 'string';
};

type CreateUserResponseType = {
  error: {
    status: 'failed' | 'OK';
    errors: CreateUserErrorsType[];
  };
};

type CreateUserErrorsType = {
  path: string[];
  message: string;
};

export {
  CreateUserType,
  UserLoginType,
  UserSuccessLoginType,
  CreateUserResponseType,
  CreateUserErrorsType,
};
