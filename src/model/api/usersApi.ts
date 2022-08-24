import {
  CreateUserType,
  UserLoginType,
  UserSuccessLoginType,
  CreateUserResponseType,
} from '../../types/userTypes';
import { baseURL } from '../../utils/constants';

const createUser = async (user: CreateUserType) => {
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

const loginUser = async (user: UserLoginType) => {
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

export { createUser, loginUser };
