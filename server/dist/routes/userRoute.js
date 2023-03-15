"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const router = (0, express_1.Router)();
router.get('/:userId', userController_1.default.getUser);
router.put('/:userId', isAuth_1.default, userController_1.default.updateUser);
router.put('/soft-delete/:userId', isAuth_1.default, userController_1.default.softDelete);
router.delete('/force-delete/:userId', isAuth_1.default, userController_1.default.forceDelete);
exports.default = router;
