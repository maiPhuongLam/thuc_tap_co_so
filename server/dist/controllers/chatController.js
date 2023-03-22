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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../configs/db");
const Chat_1 = require("../entities/Chat");
const User_1 = require("../entities/User");
class ChatController {
    createChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user1Id = req.userId;
            const user2Id = req.params.userId;
            try {
                const chatRepo = yield db_1.AppDataSource.getRepository(Chat_1.Chat);
                const chatExist = yield chatRepo.findOne({ where: { user1Id: parseInt(user1Id), user2Id: parseInt(user2Id) } });
                if (chatExist) {
                    return res.status(403).json({ status: 'fail', msg: 'Action forbidden' });
                }
                const userRepo = yield db_1.AppDataSource.getRepository(User_1.User);
                const user1 = yield userRepo.findOne({ where: { id: parseInt(user1Id) } });
                const user2 = yield userRepo.findOne({ where: { id: parseInt(user2Id) } });
                if (!user1) {
                    return res.status(400).json({ status: 'fail', msg: 'Not authoriztion' });
                }
                const newChat = yield new Chat_1.Chat();
                newChat.user1 = user1;
                newChat.user2 = user2;
                yield newChat.save();
                res.status(200).json({ status: 'success', data: newChat });
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
    userChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            try {
                const chatRepo = yield db_1.AppDataSource.getRepository(Chat_1.Chat);
                const userChats = yield chatRepo.find({
                    relations: {
                        user1: true,
                        user2: true
                    },
                    where: [
                        { user1Id: parseInt(userId) },
                        { user2Id: parseInt(userId) }
                    ]
                });
                if (userChats.length === 0) {
                    return res.status(200).json({ status: 'success', msg: 'User no chat' });
                }
                return res.status(200).json({ status: 'success', data: userChats });
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
    getChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user1Id = req.userId;
            const user2Id = req.params.userId;
            try {
                const chatRepo = yield db_1.AppDataSource.getRepository(Chat_1.Chat);
                const chat = yield chatRepo.findOne({
                    relations: {
                        user1: true,
                        user2: true
                    },
                    where: {
                        user1Id: parseInt(user1Id),
                        user2Id: parseInt(user2Id)
                    }
                });
                if (!chat) {
                    return res.status(403).json({ status: 'fail', msg: 'Chat is not found' });
                }
                res.status(200).json({ status: 'success', data: chat });
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
exports.default = new ChatController();
