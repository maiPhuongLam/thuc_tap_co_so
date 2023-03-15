"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
// username, email, phone, firstname, lastname, profilePicture, coverPicture, livesin, about
router.get('/:userId', userController_1.default.getUser);
router.put('/:userId', isAuth_1.default, [
    (0, express_validator_1.body)('username')
        .isLength({ min: 6 })
        .withMessage('Minimum length of username should be 6')
        .trim(),
    (0, express_validator_1.check)('email')
        .isEmail()
        .withMessage('Invalid Email')
        .trim(),
    (0, express_validator_1.body)('phone', 'Please enter phone has only number and length should be 10 or 11')
        .isLength({ min: 10, max: 11 })
        .trim()
        .isInt()
], userController_1.default.updateUser);
router.put('/soft-delete/:userId', isAuth_1.default, userController_1.default.softDelete);
router.delete('/force-delete/:userId', isAuth_1.default, userController_1.default.forceDelete);
exports.default = router;
