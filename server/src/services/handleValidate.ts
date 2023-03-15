import { validationResult } from 'express-validator'
import express, {Request, Response} from 'express';

export const handleValidate = (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 'fail', msg: errors.array()[0].msg })
    }
}