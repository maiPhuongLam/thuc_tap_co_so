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
const Follow_1 = require("../entities/Follow");
class FollowController {
    followUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.userId;
            const followRequest = req.body;
            const { currentUserId } = followRequest;
            try {
                if (id === currentUserId) {
                    return res.status(403).json({ status: 'fail', msg: 'Acttion forbidden' });
                }
                const followRepo = yield db_1.AppDataSource.getRepository(Follow_1.Follow);
                const userFollowUser = yield Follow_1.Follow.find({ where: { userFollowed: parseInt(id), userFollowing: parseInt(currentUserId) } });
                if (userFollowUser.length !== 0) {
                    console.log(userFollowUser);
                    return res.status(400).json({ status: 'fail', msg: 'Acttion forbidden' });
                }
                const newFollow = yield new Follow_1.Follow();
                newFollow.userFollowed = parseInt(id);
                newFollow.userFollowing = parseInt(currentUserId);
                yield followRepo.save(newFollow);
                res.status(200).json({ status: 'success', data: newFollow });
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
    unFollowUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.userId;
            const followRequest = req.body;
            const { currentUserId } = followRequest;
            try {
                if (id === currentUserId) {
                    return res.status(403).json({ status: 'fail', msg: 'Acttion forbidden' });
                }
                const followRepo = yield db_1.AppDataSource.getRepository(Follow_1.Follow);
                const userFollowUser = yield Follow_1.Follow.find({ where: { userFollowed: parseInt(id), userFollowing: parseInt(currentUserId) } });
                if (userFollowUser.length === 0) {
                    console.log(userFollowUser);
                    return res.status(400).json({ status: 'fail', msg: 'Acttion forbidden' });
                }
                console.log(userFollowUser);
                yield followRepo.remove(userFollowUser[0]);
                res.status(200).json({ status: 'success', data: userFollowUser[0] });
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
exports.default = new FollowController();
