"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const express_validator_1 = require("express-validator");
const User_1 = require("../entities/User");
const db_1 = require("../configs/db");
const router = (0, express_1.Router)();
router.post('/register', [
    (0, express_validator_1.body)('username', 'Username field is required')
        .isLength({ min: 6 })
        .trim()
        .withMessage('Minimum length of username should be 6')
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        if (value === 'adminapp') {
            throw new Error('This username is forbidden.');
        }
        else {
            const userRepo = yield db_1.AppDataSource.getRepository(User_1.User);
            return userRepo.findOne({ where: { username: value } })
                .then(userDoc => {
                if (userDoc) {
                    return Promise.reject('Username exist already, please pick a different one');
                }
            });
        }
    })),
    (0, express_validator_1.body)('password', 'Password field is required')
        .isLength({ min: 6 })
        .isAlphanumeric()
        .trim()
        .withMessage('Invalid password'),
    (0, express_validator_1.body)('confirmPassword')
        .trim()
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Confirm password have to match');
        }
        return true;
    }),
    (0, express_validator_1.check)('phone', 'Phone field is required')
        .notEmpty()
        .isNumeric()
        .withMessage('Invalid phone number')
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const userRepo = yield db_1.AppDataSource.getRepository(User_1.User);
        return userRepo.findOne({ where: { phone: value } })
            .then(userDoc => {
            if (userDoc) {
                return Promise.reject('Phone is already used to register another account, please pick a different one');
            }
        });
    })),
    (0, express_validator_1.check)('email', 'Email field is required')
        .notEmpty()
        .isEmail()
        .trim()
        .withMessage('Invalid email')
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const userRepo = yield db_1.AppDataSource.getRepository(User_1.User);
        return userRepo.findOne({ where: { email: value } })
            .then(userDoc => {
            if (userDoc) {
                return Promise.reject('Email address is already used to register another account, please pick a different one');
            }
        });
    })),
    (0, express_validator_1.body)('fistname', 'Firstname field is required')
        .notEmpty(),
    (0, express_validator_1.body)('lastname', 'Lastname field is required')
        .notEmpty(),
    (0, express_validator_1.body)('sex', 'Sex field is required')
        .notEmpty(),
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
