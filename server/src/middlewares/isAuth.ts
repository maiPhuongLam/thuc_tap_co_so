import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';


export default (req: any, res: any, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next()
  }
  const token = authHeader.split(' ')[1];
  let decodedToken: any;
  try {
    decodedToken = jwt.verify(token, 'thuc_tap_co_so');
  } catch (err) {
    req.isAuth = false;
    return next()
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next()
  }
  req.userId = decodedToken.userId;
  req.isAuth = true
  next();
};
