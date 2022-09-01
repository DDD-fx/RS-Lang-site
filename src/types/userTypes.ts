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

type StatAnswerType = {
  id: string;
  learnedWords: number;
  optional: StatOptionalType;
};

type StatOptionalType = {
  [key: string]: StatOptionalDayType;
};

type StatOptionalDayType = {
  audiochallenge: StatOptionalGameType;
  sprint: StatOptionalGameType;
};

type StatOptionalGameType = {
  wordsPerDay: number;
  learnedWordsPerDay: number;
  longestSeries: number;
  correctAnswers: number;
  incorrectAnswers: number;
};
type StatStateType = {
  dayData: StatOptionalDayType;
  allDaysData: StatAllDaysType;
};
type StatAllDaysType = {
  labels: string[];
  learnedWords: number[];
  newWords: number[];
};

type PutStatBodyType =
  | {
      learnedWords: number;
      optional: StatOptionalType;
    }
  | {};

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
  StatOptionalDayType,
  StatAllDaysType,
  StatStateType,
  PutStatBodyType,
};
