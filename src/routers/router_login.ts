import { Router } from 'express';
import { addUser, entryUser } from '../controllers/controller_login';

export const routerLogin = Router();

/**
 * @swagger
 * /login:
 *    post:
 *     summary: Entry user.
 *     description: Entry user.
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                  type: string
 *                  description: The login.
 *                  example: admin
 *               password:
 *                  type: string
 *                  description: The password.
 *                  example: 12345
 *     responses:
 *       200:
 *         description: Entry user.
 *         content:
 *           application/json:
 *             schema:
 *              type: string
 *              description: token
 *              example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNjQ3MDg0MjI2fQ.hRB7xy3CHWAWNQVg2sHCZho0EYoIFBCNN5HUZnrgmZU
 */
routerLogin.post('/login', async (req, res) => {
  const data = req.body;
  const result = await entryUser(data);
  res.set('Content-Type', 'application/json');
  res.status(200);
  res.send(result);
});

/**
 * @swagger
 * /login/reg:
 *   post:
 *     summary: Add user.
 *     description: Add user.
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                  type: string
 *                  description: The login.
 *                  example: admin
 *               password:
 *                  type: string
 *                  description: The password.
 *                  example: 12345
 *     responses:
 *       201:
 *         description: One entry.
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id: 
 *                  type: string
 *                  description: user ID
 *                  example: 21b7ed40-1ab9-45bd-96f6-ae89cfe0e8a4
 *                login:
 *                   type: string
 *                   description: The login.
 *                   example: admin
 *                password:
 *                   type: string
 *                   description: The password.
 *                   example: 12345
 */
routerLogin.post('/login/reg', async (req, res) => {
  const data = req.body;
  
  if (typeof data.login === 'string' && typeof data.password === 'string') {
    const result = await addUser(data);
    res.set('Content-Type', 'application/json');
    res.status(201);
    res.send(result);
  } else {
    res.set('Content-Type', 'application/json');
    res.status(400);
    res.send('Bad request!'); 
  };
  
});
