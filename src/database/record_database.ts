import { getRepository } from 'typeorm';
import { Record } from '../models/record_model';

export const getRecordDb = async () => {
  const record = await getRepository(Record).find();
  return record;
};

export const getRecordOneDb = async (id) => {
  const record = await getRepository(Record).findOne({
    where: { id: id },
  });
  return record;
};

export const addRecordDb = async (data) => {
  const record = await getRepository(Record).save(data);
  return record;
};

export const putRecordDb = async (id, data) => {
  await getRepository(Record).update({ id }, { ...data });
  const record = await getRecordOneDb(id);
  
  return record;
};

export const deleteRecordDb = async (id) => {
  await getRepository(Record).delete(id);
};

export const checkAuthorRecordDb = async (id, author) => {
  const record = await getRepository(Record).findOne({
    where: { id },
  });
  if (!record) return false;
  
  return record.author! === author? true : false;
};
