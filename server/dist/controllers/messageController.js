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
const Message_1 = require("../entities/Message");
const Chat_1 = require("../entities/Chat");
class ChatController {
    addMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const chatId = req.params.chatId;
            const messageRequest = req.body;
            const { text } = messageRequest;
            try {
                const messageRepo = yield db_1.AppDataSource.getRepository(Message_1.Message);
                const newMessage = yield new Message_1.Message();
                newMessage.chatId = parseInt(chatId);
                newMessage.senderId = parseInt(userId);
                newMessage.text = text;
                yield newMessage.save();
                res.status(200).json({ status: 'success', data: newMessage });
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
            const userId1 = req.userId;
            try {
                const chatRepo = yield db_1.AppDataSource.getRepository(Chat_1.Chat);
                const userChats = yield chatRepo.find({ where: { userId1: parseInt(userId1) } });
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
            const userId1 = req.userId;
            const userId2 = req.params.userId;
            try {
                const chatRepo = yield db_1.AppDataSource.getRepository(Chat_1.Chat);
                const chat = yield chatRepo.findOne({ where: { userId1: parseInt(userId1), userId2: parseInt(userId2) } });
                if (chat) {
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
