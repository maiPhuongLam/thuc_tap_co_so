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
const express_1 = __importDefault(require("express"));
const db_1 = require("./configs/db");
const app = (0, express_1.default)();
const PORT = 5000;
app.get('/test', (req, res) => {
    res.json({
        data: 'test'
    });
});
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield db_1.AppDataSource.initialize();
        if (connection) {
            console.log('Connect db success');
            yield app.listen(PORT, () => {
                console.log(`Server is running on port: ${PORT}`);
            });
        }
        else {
            console.log('Connect db fail');
        }
    }
    catch (error) {
        console.log(error);
        console.log('Connect db fail');
    }
});
startApp();
