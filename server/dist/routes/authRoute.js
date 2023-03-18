"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post('/register', [
    (0, express_validator_1.body)('username', 'Username field is required')
        .isLength({ min: 6 })
        .trim()
        .withMessage('Minimum length of username should be 6'),
    (0, express_validator_1.body)('password', 'Password field is required')
        .isLength({ min: 6 })
        .isAlphanumeric()
        .trim()
        .withMessage('Invalid password'),
    (0, express_validator_1.check)('phone', 'Phone field is required')
        .notEmpty()
        .isNumeric()
        .withMessage('Invalid phone number'),
    (0, express_validator_1.check)('email', 'Email field is required')
        .notEmpty()
        .isEmail()
        .trim()
        .withMessage('Invalid email'),
    (0, express_validator_1.body)('sex', 'Sex field is required')
        .notEmpty,
    (0, express_validator_1.body)('dateOfbirth')
], authController_1.default.register);
router.post('/login', [
    (0, express_validator_1.body)('username', 'Username field is required')
        .isLength({ min: 6 })
        .trim()
        .withMessage('Invalid username'),
    (0, express_validator_1.body)('password', 'Password field is required')
        .isLength({ min: 6 })
        .isAlphanumeric()
        .trim()
        .withMessage('Invalid password'),
], authController_1.default.login);
exports.default = router;
