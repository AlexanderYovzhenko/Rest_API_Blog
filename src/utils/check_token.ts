import jwt from 'jsonwebtoken';

export const checkToken = (req, res, next) => {
  const path = req.originalUrl;

  const autHeader = req.headers.authorization || req.headers.sw_authorization;

  if (path === '/login' || path === '/login/reg' || path.includes('/docs', 0) || path === '/')
    return next();

  if (autHeader === undefined) {
    res.status(403).send('Authorization Error!');
  } else {
    const [type, token] = autHeader.split(' ');

    if (type === 'Bearer' && token) {
      try {
        jwt.verify(token, '10'!);
      } catch (error) {
        res.status(403).send('Authorization Error!');
      }
    } else {
      res.status(403).send('Authorization Error!');
    }
  }

  next();
}