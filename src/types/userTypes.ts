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
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
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

type StatOptionalType = {
  [key: string]: StatOptionalDayType;
};

type StatOptionalDayType = {
  wordsPerDay: number;
  learnedWordsPerDay: number;
  longestSeries: number;
};

type StatAnswerType = {
  id: string;
  learnedWords: number;
  optional: StatOptionalType;
};

type PutStatBodyType = {
  learnedWords: number;
  optional: StatOptionalType;
};

type DecodedTokenType = {
  id: string;
  iat: string;
  exp: string;
};

export {
  CreateUserType,
  UserLoginType,
  UserSuccessLoginType,
  CreateUserResponseType,
  CreateUserErrorsType,
  DecodedTokenType,
  StatAnswerType,
  PutStatBodyType,
};
