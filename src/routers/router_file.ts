import { Router } from "express";
import * as fs from "fs";
import { getRecordOne } from "../controllers/controller";
import { filePath } from "../utils/file_path";

export const routerFile = Router();

/**
 * @swagger
 * /records/file/{id}:
 *   get:
 *     summary: Dowland file.
 *     description: Dowland file.
 *     tags: [File]
 *     consumes:
 *       - multipart/form-data
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
 *         description: One file.
 *         content:
 *           application/json:
 *             schema:
 *              type: string
 *              description: Dowland file
 *              example: Dowland file!
 */
routerFile.get('/records/file/:id', async (req, res) => {
  const { id } = req.params;
  const result = await getRecordOne(id); 
  
  result.fileName !== ''? res.download(result.fileName) : res.send('No file!');
});

/**
 * @swagger
 * /records/file:
 *   post:
 *     summary: Upload file.
 *     description: Upload file.
 *     tags: [File]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *      - in: header
 *        name: sw_authorization 
 *        type: string
 *        required: true
 *        default: Bearer token
 *     requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                file:
 *                  type: array
 *                  items:
 *                    type: string
 *                    format: binary
 *     responses:
 *       201:
 *         description: One file.
 *         content:
 *           application/json:
 *             schema:
 *              type: string
 *              description: Upload file
 *              example: Upload file!
 */
routerFile.post('/records/file', async (req, res) => {
  let sampleFile;
  let uploadPath; 
  
  if (req.files || Object.keys(req.files).length !== 0) {
    sampleFile = req.files.file || req.files[''];
    if (!sampleFile) {
      res.status(400);
      res.send('The title should be "file"');
      return;
    }
    uploadPath = __dirname + '../../files/' + sampleFile.name;
    filePath.push(uploadPath);
 
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
    });

    res.status(201);
    res.send('Upload file!')
  };
});

/**
 * @swagger
 * /records/file/{id}:
 *   delete:
 *     summary: Delete file.
 *     description: Delete file.
 *     tags: [File]
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
 *         description: Delete file.
 */
routerFile.delete('/records/file/:id', async (req, res) => {
  const { id } = req.params;
  const result = await getRecordOne(id); 
  
  result.fileName !== ''? fs.unlink(result.fileName, () => { res.status(204) }): res.send('No file!');

  filePath.push('');
});