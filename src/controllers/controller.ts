import { addRecordDb, checkAuthorRecordDb, deleteRecordDb, getRecordDb, getRecordOneDb, putRecordDb } from "../database/record_database";

export const getRecord = async () => {
  return await getRecordDb();
};

export const getRecordOne = async (id) => {
  return await getRecordOneDb(id);
};

export const addRecord = async (data) => {
  return await addRecordDb(data); 
};

export const putRecord = async (id, data) => {
  return await putRecordDb(id, data);
};

export const deleteRecord = async (id) => {
 return await deleteRecordDb(id);
};

export const checkAuthorRecord = async (id, author) => {
  return await checkAuthorRecordDb(id, author);
};
