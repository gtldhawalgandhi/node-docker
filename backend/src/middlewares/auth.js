import jwt from 'jsonwebtoken';

const tokenMiddleware = (req, res, next) => {
  const token = req.headers && req.headers.authorization;
  if (token) {
    const decodedJWTData = jwt.verify(token, 'randomTokenSecretKey123');
    req.user = decodedJWTData;
    req.userId = decodedJWTData.id;
    next();
  }
  else {
    res.status(401).json({
      err: 'unauthorized access',
    });
  }
};

export {
  tokenMiddleware
};