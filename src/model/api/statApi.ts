import { StatAnswerType, PutStatBodyType } from '../../types/userTypes';
import { baseURL } from '../../utils/constants';

const getStat = async (userId: string, token: string): Promise<StatAnswerType | undefined> => {
  try {
    const response = await fetch(`${baseURL}users/${userId}/statistics`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return await ((await response.json()) as Promise<StatAnswerType>);
  } catch (err) {
    return null;
  }
};

const putStat = async (
  userId: string,
  token: string,
  bodyStat: PutStatBodyType,
): Promise<StatAnswerType | undefined> => {
  try {
    const response = await fetch(`${baseURL}users/${userId}/statistics`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyStat),
    });
    return await ((await response.json()) as Promise<StatAnswerType>);
  } catch (err) {
    console.error(err);
  }
};

export { getStat, putStat };
