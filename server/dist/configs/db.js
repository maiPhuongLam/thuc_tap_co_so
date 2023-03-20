"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Post_1 = require("../entities/Post");
const User_1 = require("../entities/User");
const Comment_1 = require("../entities/Comment");
const Like_1 = require("../entities/Like");
const Message_1 = require("../entities/Message");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "mpl08092002",
    database: "thuc_tap_co_so",
    synchronize: false,
    logging: false,
    entities: [User_1.User, Post_1.Post, Comment_1.Comment, Like_1.Like, Message_1.Message]
});
