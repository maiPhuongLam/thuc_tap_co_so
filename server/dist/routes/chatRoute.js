"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatController_1 = __importDefault(require("../controllers/chatController"));
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const router = (0, express_1.Router)();
router.post('/:userId', chatController_1.default.createChat);
router.get('/', isAuth_1.default, chatController_1.default.userChat);
router.get('/find/:userId', isAuth_1.default, chatController_1.default.getChat);
exports.default = router;
