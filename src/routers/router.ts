import { Router } from 'express';
import { addRecord, deleteRecord, getRecord, getRecordOne, putRecord } from '../controllers/controller';

export const router = Router();

router.get('/user', (_, res) => {
  const result = getRecord();
  res.send(result);
});

router.get('/user/:id', (req, res) => {
  const { id } = req.params;
  const result = getRecordOne(id);
  res.send(result);
});

router.post('/user', (req, res) => {
  const data = req.body;
  const result = addRecord(data);
  res.send(result);
});

router.put('/user/:id', (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = putRecord(id, data);
  res.send(result);
});

router.delete('/user/:id', (req, res) => {
  const { id } = req.params;
  deleteRecord(id);
  res.status(204);
  res.send();
});
