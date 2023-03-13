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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../configs/db");
const User_1 = require("../entities/User");
class UserController {
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const userRepo = yield db_1.AppDataSource.getRepository(User_1.User);
                const user = yield userRepo.findOne({ where: { id: parseInt(id) } });
                if (!user) {
                    return res.status(400).json({ status: 'fail', msg: 'User not found' });
                }
                const { password } = user, orthers = __rest(user, ["password"]);
                res.status(200).json({ status: 'success', user: orthers });
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
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRequest = req.body;
            const { username, email, phone, firstname, lastname, profilePicture, coverPicture, livesin, about, currentUserId } = userRequest;
            const id = req.params.id;
            try {
                if (id !== currentUserId) {
                    return res.status(400).json({ status: 'fail', msg: 'Not authorization ' });
                }
                const userRepo = yield db_1.AppDataSource.getRepository(User_1.User);
                const user = yield userRepo.findOne({ where: { id: parseInt(id) } });
                if (!user) {
                    return res.status(400).json({ status: 'fail', msg: 'User not found' });
                }
                user.username = username;
                user.email = email;
                user.phone = phone;
                user.firstname = firstname;
                user.lastname = lastname;
                user.profilePicture = profilePicture;
                user.coverPicture = coverPicture;
                user.livesin = livesin;
                user.about = about;
                yield userRepo.save(user);
                return res.status(200).json({ status: 'success', user });
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
    softDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const userRequest = req.body;
            const { currentUserId } = userRequest;
            try {
                if (id !== currentUserId) {
                    return res.status(400).json({ status: 'fail', msg: 'Not authorization ' });
                }
                const userRepo = yield db_1.AppDataSource.getRepository(User_1.User);
                const user = yield userRepo.findOne({ where: { id: parseInt(id) } });
                if (!user) {
                    return res.status(400).json({ status: 'fail', msg: 'User not found' });
                }
                yield userRepo.softDelete(user.id);
                yield userRepo.save(user);
                res.status(200).json({ status: 'success', user });
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
    forceDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const userRequest = req.body;
            const { currentUserId } = userRequest;
            try {
                if (id !== currentUserId) {
                    return res.status(400).json({ status: 'fail', msg: 'Not authorization ' });
                }
                const userRepo = yield db_1.AppDataSource.getRepository(User_1.User);
                const user = yield userRepo.findOne({ where: { id: parseInt(id) } });
                if (!user) {
                    return res.status(400).json({ status: 'fail', msg: 'User not found' });
                }
                yield userRepo.delete(user.id);
                res.status(200).json({ status: 'success', user });
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
exports.default = new UserController();
