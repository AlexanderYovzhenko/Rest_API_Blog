import jwt from 'jsonwebtoken';
import { addUserLogin, getUserLogin } from '../database/user_database';

const signToken = async (login: string, password: string) => {
  const user = await getUserLogin(login);

  if (!user) {
    return 'Wrong login/password combination!';
  }

  if (!(user.password === password)) {
    return 'Wrong login/password combination!';
  } else {
    const { login } = user;
    const token = jwt.sign({ login }, '10', {});

    return token;
  }
};

export const addUser = async (data) => {
  const { login } = data;
  if (await getUserLogin(login)) {
    return 'login is busy';
  } else {
    await addUserLogin(data);
    return await getUserLogin(login);
  };
  
};

export const entryUser = async (data) => {
  const { login, password } = data;
  const result = await signToken(login, password);
  
  return result;
};
