import { Router } from "express";
import userController from "../controllers/userController";
import isAuth from "../middlewares/isAuth";
const router = Router()

router.get('/:userId', userController.getUser)
router.put('/userId', isAuth, userController.updateUser)
router.put('/soft-delete/:userId', isAuth, userController.softDelete)
router.delete('/force-delete/:userId', isAuth, userController.forceDelete)

export default router
