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
const createToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, 'thuc_tap_co_so', { expiresIn: '1d' });
};
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, phone, password, firstname, lastname, profilePicture, coverPicture, livesin, about } = req.body;
            try {
                const userModel = yield db_1.AppDataSource.getRepository(User_1.User);
                const user = yield userModel.findOne({ where: { username } });
                if (user) {
                    return res.status(400).json({ status: 'fail', msg: 'User is exist' });
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
                newUser.profilePicture = profilePicture;
                newUser.coverPicture = coverPicture;
                newUser.livesin = livesin;
                newUser.about = about;
                newUser.isAdmin = false;
                newUser.isDeleted = false;
                yield userModel.save(newUser);
                return res.status(201).json({ status: 'success', user: newUser });
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
            const { username, password } = req.body;
            try {
                const userModel = yield db_1.AppDataSource.getRepository(User_1.User);
                const user = yield userModel.findOne({ where: { username } });
                if (!user) {
                    return res.status(400).json({ status: 'fail', msg: 'User not found' });
                }
                const isEqual = yield bcrypt_1.default.compare(password, user.password);
                if (!isEqual) {
                    return res.status(400).json({ status: 'fail', msg: 'Incorrect password' });
                }
                const token = yield createToken(user.id);
                res.status(200).json({ status: 'success', user, token });
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
