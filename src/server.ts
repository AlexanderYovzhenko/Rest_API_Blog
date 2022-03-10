import express from 'express';
import bodyParser from 'body-parser';

import { router } from './routers/router';
import { routerLogin } from './routers/router_login';
import { checkToken } from './utils/check_token';

const server = express();

server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));

const PORT = 8080;

server.listen(PORT, () => {
  console.info('Server is running!');
});

server.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

server.use(checkToken);
server.use(routerLogin);
server.use(router);
