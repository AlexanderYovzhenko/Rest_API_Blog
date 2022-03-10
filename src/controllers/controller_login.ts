let users = [];
import jwt from 'jsonwebtoken';

const getUserLogin = (login) => {
  const user = users.filter(user => user.login === login);

  if (user.length > 0) {
    return user[0];
  } else {
    return null;
  };
}

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

export const addUser = (data) => {
  const { login } = data;
  if (getUserLogin(login)) {
    return 'login is busy';
  } else {
    users.push(data);
    return 'User created'
  };
};

export const entryUser = async (data) => {
  const { login, password } = data;
  const result = await signToken(login, password);
  
  return result;
};
