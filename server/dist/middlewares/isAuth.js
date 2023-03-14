"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(400).json('Not authorization');
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, 'thuc_tap_co_so');
    }
    catch (error) {
        let msg;
        if (error instanceof Error) {
            msg = error.message;
        }
        return res.status(400).json({ status: 'fail', msg });
    }
    if (!decodedToken) {
        return res.status(400).json({ status: 'fail', msg: 'Token is incorrect' });
    }
    req.userId = decodedToken.userId;
    next();
};
