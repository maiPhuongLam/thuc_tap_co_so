import { Router } from "express";
import userController from "../controllers/userController";
import isAuth from "../middlewares/isAuth";
const router = Router()

router.get('/:id', userController.getUser)
router.put('/:id', isAuth, userController.updateUser)


export default router
