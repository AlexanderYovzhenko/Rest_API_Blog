import { Router } from 'express';
import { addRecord, checkAuthorRecord, deleteRecord, getRecord, getRecordOne, putRecord } from '../controllers/controller';
import { filePath } from '../utils/file_path';

export const router = Router();

/**
 * @swagger
 * /:
 *  get:
 *    description: Home page!
 *    summary: Home page.
 *    tags: [Records]
 *    responses:
 *      200:
 *        description: Home page.
 */
router.get('/', (_, res) => {
  res.set('Content-Type', 'application/json');
  res.status(200);
  res.send('Home page!')
});

/**
 * @swagger
 * /records:
 *   get:
 *     summary: Get all records.
 *     description: Get all records.
 *     tags: [Records]
 *     parameters:
 *      - in: header
 *        name: sw_authorization 
 *        type: string
 *        required: true
 *        default: Bearer token
 *     responses:
 *       200:
 *         description: A list of records.
 *         content:
 *           application/json:
 *             schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  author:
 *                    type: string
 *                    description: The author.
 *                    example: admin
 *                  message:
 *                    type: string
 *                    description: The record's message.
 *                    example: Me message
 */
router.get('/records', async (_, res) => {
  const result = await getRecord();
  res.set('Content-Type', 'application/json');
  res.status(200);
  res.send(result);
});

/**
 * @swagger
 * /records/{id}:
 *   get:
 *     summary: Get record by id.
 *     description: Get record by id.
 *     tags: [Records]
 *     parameters:
 *      - in: header
 *        name: sw_authorization 
 *        type: string
 *        required: true
 *        default: Bearer token
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the record to retrieve.
 *     responses:
 *       200:
 *         description: One entry.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                id: 
 *                  type: uuid
 *                  description: id
 *                  example: 85054fbf-991b-4160-b9c0-83ef055bb553
 *                author:
 *                  type: string
 *                  description: The author.
 *                  example: admin
 *                message:
 *                  type: string
 *                  description: The record's message.
 *                  example: Me message
 *                date: 
 *                  type: string
 *                  description: Date
 *                  example: 2022-03-12T14:14:39.060Z
 */
router.get('/records/:id', async (req, res) => {
  const { id } = req.params;
  const result = await getRecordOne(id);
 
  res.set('Content-Type', 'application/json');
  res.status(200);
  res.send(result);
});

/**
 * @swagger
 * /records:
 *   post:
 *     summary: Add record.
 *     description: Add record.
 *     tags: [Records]
 *     parameters:
 *      - in: header
 *        name: sw_authorization 
 *        type: string
 *        required: true
 *        default: Bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               author:
 *                  type: string
 *                  description: The author.
 *                  example: admin
 *               message:
 *                  type: string
 *                  description: The record's message.
 *                  example: Me message
 *     responses:
 *       201:
 *         description: One entry.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                id: 
 *                  type: uuid
 *                  description: id
 *                  example: 85054fbf-991b-4160-b9c0-83ef055bb553
 *                author:
 *                  type: string
 *                  description: The author.
 *                  example: admin
 *                message:
 *                  type: string
 *                  description: The record's message.
 *                  example: Me message
 *                date: 
 *                  type: string
 *                  description: Date
 *                  example: 2022-03-12T14:14:39.060Z
 */
router.post('/records', async (req, res) => {
  const data = req.body;
  data.date = new Date();
  data.fileName = filePath[filePath.length - 1] || '';

  if (typeof data.author === 'string' && typeof data.message === 'string') { 
    const result = await addRecord(data);
    res.set('Content-Type', 'application/json');
    res.status(201);
    res.send(result);
  } else {
    res.set('Content-Type', 'application/json');
    res.status(400);
    res.send('Bad request!'); 
  };
});

/**
 * @swagger
 * /records/{id}:
 *   put:
 *     summary: Update record.
 *     description: Update record.
 *     tags: [Records]
 *     parameters:
 *      - in: header
 *        name: sw_authorization 
 *        type: string
 *        required: true
 *        default: Bearer token
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the record to retrieve.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               author:
 *                  type: string
 *                  description: The author.
 *                  example: admin
 *               message:
 *                  type: string
 *                  description: The record's message.
 *                  example: Me message
 *     responses:
 *       201:
 *         description: One entry.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                id: 
 *                  type: uuid
 *                  description: id
 *                  example: 85054fbf-991b-4160-b9c0-83ef055bb553
 *                author:
 *                  type: string
 *                  description: The author.
 *                  example: admin
 *                message:
 *                  type: string
 *                  description: The record's message.
 *                  example: Me message
 *                date: 
 *                  type: string
 *                  description: Date
 *                  example: 2022-03-12T14:14:39.060Z
 */
router.put('/records/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  data.date = new Date();
  data.fileName = filePath[filePath.length - 1] || '';
  
  if (typeof data.author === 'string' && typeof data.message === 'string') {
    const { author } = data;
    if (await checkAuthorRecord(id, author)) {
      const result = await putRecord(id, data);
      res.set('Content-Type', 'application/json');
      res.status(201);
      res.send(result);
    } else {
      res.set('Content-Type', 'application/json');
      res.status(406);
      res.send('You are not the author of this entry!')
    };
  } else {
    res.set('Content-Type', 'application/json');
    res.status(400);
    res.send('Bad request!'); 
  }; 
});

/**
 * @swagger
 * /records/{id}:
 *   delete:
 *     summary: Delete record by id.
 *     description: Delete record by id.
 *     tags: [Records]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               author:
 *                  type: string
 *                  description: The author.
 *                  example: admin
 *               message:
 *                  type: string
 *                  description: The record's message.
 *                  example: Me message
 *     parameters:
 *      - in: header
 *        name: sw_authorization 
 *        type: string
 *        required: true
 *        default: Bearer token
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the record to retrieve.
 *     responses:
 *       204:
 *         description: Delete record.
 */
router.delete('/records/:id', async (req, res) => {
  const { author } = req.body;
  const { id } = req.params;

  if (await checkAuthorRecord(id, author)) {
    await deleteRecord(id);
    res.set('Content-Type', 'application/json');
    res.status(204);
    res.send();
  } else {
    res.set('Content-Type', 'application/json');
    res.status(406);
    res.send('You are not the author of this entry!')
  };
});
