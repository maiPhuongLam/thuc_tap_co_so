"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = __importDefault(require("../controllers/postController"));
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const router = (0, express_1.Router)();
router.post('/create-post', isAuth_1.default, postController_1.default.createPost);
router.get('/:postId', isAuth_1.default, postController_1.default.getPost);
router.get('/', isAuth_1.default, postController_1.default.getPosts);
router.get('/user/:userId', isAuth_1.default, postController_1.default.getPostsOfUser);
router.put('/:postId', isAuth_1.default, postController_1.default.updatePost);
router.delete('/:postId', isAuth_1.default, postController_1.default.deletePost);
exports.default = router;
