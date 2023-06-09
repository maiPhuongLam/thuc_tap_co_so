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
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("./configs/db");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const multer_2 = require("./configs/multer");
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const followRoute_1 = __importDefault(require("./routes/followRoute"));
const postRoute_1 = __importDefault(require("./routes/postRoute"));
const chatRoute_1 = __importDefault(require("./routes/chatRoute"));
const messageRoute_1 = __importDefault(require("./routes/messageRoute"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const PORT = 5000;
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, multer_1.default)({ storage: multer_2.multerConfig.storage, fileFilter: multer_2.multerConfig.fileFilter }).single('image'));
app.use(express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use('/auth', authRoute_1.default);
app.use('/user', userRoute_1.default);
app.use('/follow', followRoute_1.default);
app.use('/post', postRoute_1.default);
app.use('/chat', chatRoute_1.default);
app.use('/message', messageRoute_1.default);
let activeUsers = [];
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield db_1.AppDataSource.initialize();
        if (connection) {
            console.log('Connect db success');
            yield server.listen(PORT, () => {
                console.log(`Server is running on port: ${PORT}`);
            });
            exports.io.on('connection', (socket) => {
                console.log('User is connected ', activeUsers);
                socket.on('new-user-add', (newUserId) => {
                    console.log('newUserId: ', newUserId);
                    if (!activeUsers.some(user => user.userId === newUserId)) {
                        activeUsers.push({
                            userId: newUserId,
                            socketId: socket.id
                        });
                        console.log(activeUsers);
                    }
                    exports.io.emit('get-users', activeUsers);
                });
                socket.on('send-message', data => {
                    const { receiverId } = data;
                    const user = activeUsers.find(user => user.userId === receiverId);
                    console.log(`Sending from socket to: ${receiverId}`);
                    console.log(data);
                    console.log('user', user);
                    if (user) {
                        console.log(`usersocketid: ${user.socketId}`);
                        exports.io.to(user.socketId).emit('receive-message', data);
                    }
                });
                socket.on('disconnect', () => {
                    activeUsers.filter(user => user.socketId !== socket.id);
                    console.log('User is disconnected ', activeUsers);
                    exports.io.emit('get-users', activeUsers);
                });
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
