import { getRepository } from 'typeorm';
import { User } from '../models/user_model';

export const getUserLogin = async (login) => {
  const user = await getRepository(User).findOne({
    where: { login: login },
  });

  return user;
};

export const addUserLogin = async (data) => {
  await getRepository(User).save(data);
};
