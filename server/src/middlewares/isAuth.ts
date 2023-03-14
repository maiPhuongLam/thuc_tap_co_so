import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(400).json('Not authorization')
    }

    const token = authHeader.split(' ')[1];
    let decodedToken: any;

    try {
      decodedToken = jwt.verify(token, 'thuc_tap_co_so');
    } catch (error) {
        let msg
        if (error instanceof Error) {
            msg = error.message
        }
        return res.status(400).json({ status: 'fail', msg })
    }
    if (!decodedToken) {
      return res.status(400).json({ status: 'fail', msg: 'Token is incorrect' })
    }
    req.userId = decodedToken.userId;
    next();
};
