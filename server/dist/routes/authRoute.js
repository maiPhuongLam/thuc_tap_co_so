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
    (0, express_validator_1.body)('username')
        .isLength({ min: 6 })
        .withMessage('Minimum length of username should be 6')
        .trim(),
    (0, express_validator_1.body)('password', 'Please enter password at least 6 character')
        .isLength({ min: 6 })
        .isAlphanumeric()
        .trim(),
], authController_1.default.register);
router.post('/login', [
    (0, express_validator_1.body)('username')
        .isLength({ min: 6 })
        .withMessage('Minimum length of username should be 6')
        .trim(),
    (0, express_validator_1.body)('password', 'Please enter password at least 6 character')
        .isLength({ min: 6 })
        .isAlphanumeric()
        .trim(),
], authController_1.default.login);
exports.default = router;
