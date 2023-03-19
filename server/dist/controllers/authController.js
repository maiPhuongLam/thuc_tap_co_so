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
const db_1 = require("../configs/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../entities/User");
const express_validator_1 = require("express-validator");
const nodemailer_1 = __importDefault(require("nodemailer"));
const createToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, 'thuc_tap_co_so', { expiresIn: '1d' });
};
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ status: 'fail', msg: errors.array()[0].msg });
            }
            const authRequest = req.body;
            const { username, email, phone, password, confirmPassword, firstname, lastname, dateOfBirth, sex } = authRequest;
            try {
                const userRepo = yield db_1.AppDataSource.getRepository(User_1.User);
                const user = yield userRepo.findOne({ where: { username } });
                if (user) {
                    return res.status(400).json({ status: 'fail', msg: 'Username is exist' });
                }
                const existEmail = yield userRepo.findOne({ where: { email } });
                if (existEmail) {
                    return res.status(400).json({ status: 'fail', msg: 'Email is already used to register another account' });
                }
                const existPhone = yield userRepo.findOne({ where: { phone } });
                if (existPhone) {
                    return res.status(400).json({ status: 'fail', msg: 'Phone is already used to register another account' });
                }
                if (password !== confirmPassword) {
                    return res.status(400).json({ status: 'fail', msg: 'Confirm password have to match' });
                }
                const salt = yield bcrypt_1.default.genSalt(10);
                const hasdedPass = yield bcrypt_1.default.hash(password, salt);
                const newUser = yield new User_1.User();
                newUser.username = username;
                newUser.email = email;
                newUser.phone = phone;
                newUser.password = hasdedPass;
                newUser.firstname = firstname;
                newUser.lastname = lastname;
                newUser.coverPicture = 'https://i.pinimg.com/originals/4f/f4/09/4ff40958bc4d78882c0d44be38753f14.jpg';
                newUser.profilePicture = 'https://cdn2.vectorstock.com/i/1000x1000/56/71/avatar-user-icon-vector-21105671.jpg';
                newUser.dateOfBirth = dateOfBirth;
                newUser.sex = sex;
                newUser.livesin = 'null';
                newUser.about = 'null';
                newUser.isAdmin = false;
                newUser.isDeleted = false;
                // newUser.createdAt = new Date()
                // newUser.updatedAt = new Date()
                yield userRepo.save(newUser);
                return res.status(201).json({ status: 'success', data: newUser });
            }
            catch (error) {
                let msg;
                if (error instanceof Error) {
                    msg = error.message;
                }
                res.status(500).json({ status: 'fail', msg });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ status: 'fail', msg: errors.array()[0].msg });
            }
            const authRequest = req.body;
            const { username, password } = authRequest;
            try {
                const userRepo = yield db_1.AppDataSource.getRepository(User_1.User);
                const user = yield userRepo.findOne({ where: { username } });
                if (!user) {
                    return res.status(400).json({ status: 'fail', msg: 'User not found' });
                }
                const isEqual = yield bcrypt_1.default.compare(password, user.password);
                if (!isEqual) {
                    return res.status(400).json({ status: 'fail', msg: 'Incorrect password' });
                }
                if (user.isDeleted === true) {
                    return res.status(400).json({ status: 'fail', msg: 'User not found' });
                }
                const token = yield createToken(user.id);
                res.status(200).json({ status: 'success', data: { userId: user.id, token } });
            }
            catch (error) {
                let msg;
                if (error instanceof Error) {
                    msg = error.message;
                }
                res.status(500).json({ status: 'fail', msg });
            }
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authRequest = req.body;
            const { email } = authRequest;
            try {
                const userRepo = yield db_1.AppDataSource.getRepository(User_1.User);
                const user = yield userRepo.findOne({ where: { email } });
                if (!user) {
                    return res.status(400).json({ status: 'fail', msg: 'Username or email is incorrect' });
                }
                const newPassword = yield Math.floor(Math.random() * 1000000).toString();
                const salt = yield bcrypt_1.default.genSalt(10);
                const newHassPassword = yield bcrypt_1.default.hash(newPassword, salt);
                const transporter = yield nodemailer_1.default.createTransport({
                    // service: 'gmail',
                    host: "sandbox.smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                        user: "3cd274007d941a",
                        pass: "60374a09de842d"
                    }
                });
                const mailOptions = {
                    from: 'Sky app <446df79f0f-82456a@inbox.mailtrap.io>',
                    to: email,
                    subject: 'Password reset',
                    html: `
                    <p>🚨 New password: ${newPassword}</p>
                    <p>🚨 Click this <a href="http://localhost:3000/login/">link</a> to login again. 😱</p>
                `
                };
                yield transporter.sendMail(mailOptions);
                console.log('se');
                user.password = newHassPassword;
                yield user.save();
                res.status(200).json({ status: 'success', msg: 'email sended' });
            }
            catch (error) {
                let msg;
                if (error instanceof Error) {
                    msg = error.message;
                }
                res.status(500).json({ status: 'fail', msg });
            }
        });
    }
}
exports.default = new AuthController();
