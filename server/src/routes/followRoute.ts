import { Router } from "express";
import followController from "../controllers/followController";
import isAuth from "../middlewares/isAuth";
const router = Router()

router.post('/:id',isAuth, followController.followUser)
router.delete('/:id',isAuth, followController.unFollowUser)

export default router
