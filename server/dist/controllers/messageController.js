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
}
exports.default = new ChatController();
