let db = [{id: 1}];

export const getRecord = () => {
  return db;
};

export const getRecordOne = (id) => {
  return db.filter(el => +el.id === +id);
};

export const addRecord = (data) => {
  const date = new Date();
  data.date = date;
  db.push(data);
  return data;
};

export const putRecord = (id, data) => {
  const date = new Date();
  data.date = date;
  db = db.map(el => el.id === id ? data : el);
  return getRecordOne(id);
};

export const deleteRecord = (id) => {
  db = db.filter(el => el.id !== id);
};
