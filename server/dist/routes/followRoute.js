"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const followController_1 = __importDefault(require("../controllers/followController"));
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const router = (0, express_1.Router)();
router.post('/:id', isAuth_1.default, followController_1.default.followUser);
router.delete('/:id', isAuth_1.default, followController_1.default.unFollowUser);
exports.default = router;
