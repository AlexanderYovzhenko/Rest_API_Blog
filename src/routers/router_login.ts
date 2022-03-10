import { Router } from 'express';
import { addUser, entryUser } from '../controllers/controller_login';

export const routerLogin = Router();

routerLogin.get('/login', async (req, res) => {
  const data = req.body;
  const result = await entryUser(data);
  res.send(result);
});

routerLogin.post('/login/reg', (req, res) => {
  const data = req.body;
  const result = addUser(data);
  res.send(result);
});
