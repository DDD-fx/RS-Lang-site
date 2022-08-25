import {
  CreateUserType,
  UserLoginType,
  UserSuccessLoginType,
  CreateUserResponseType,
  DecodedTokenType,
} from '../../types/userTypes';
import { baseURL } from '../../utils/constants';

const createUser = async (user: CreateUserType): Promise<(number | CreateUserResponseType)[]> => {
  const rawResponse = await fetch(`${baseURL}users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const status = rawResponse.status;
  const content = (await rawResponse.json()) as CreateUserResponseType;
  return [status, content];
};

const loginUser = async (
  user: UserLoginType,
): Promise<string[] | (number | UserSuccessLoginType)[]> => {
  try {
    const rawResponse = await fetch(`${baseURL}signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const status = rawResponse.status;
    const content = (await rawResponse.json()) as UserSuccessLoginType;
    return [status, content];
  } catch (error) {
    return ['404'];
  }
};

const getNewToken = async (
  userId: string,
  refreshToken: string,
): Promise<UserSuccessLoginType | undefined> => {
  try {
    const response = await fetch(`${baseURL}users/${userId}/tokens`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + refreshToken,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return await ((await response.json()) as Promise<UserSuccessLoginType>);
  } catch (err) {
    console.error(err);
  }
};

const getExpirationDate = (token: string): number => {
  const decodedToken = JSON.parse(atob(token.split('.')[1])) as DecodedTokenType;
  return +decodedToken.exp * 1000;
};

const isExpired = (exp?: number): boolean => {
  if (!exp) {
    return false;
  }

  return Date.now() > exp;
};

export { createUser, loginUser, getNewToken, getExpirationDate, isExpired };
