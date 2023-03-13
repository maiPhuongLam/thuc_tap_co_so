import { Router } from "express";
import userController from "../controllers/userController";
import isAuth from "../middlewares/isAuth";
const router = Router()

router.get('/:id', userController.getUser)
router.put('/:id', isAuth, userController.updateUser)
router.put('/soft-delete/:id', isAuth, userController.softDelete)
router.delete('/force-delete/:id', isAuth, userController.forceDelete)

export default router
