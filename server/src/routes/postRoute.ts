import { Router } from "express";
import postController from "../controllers/postController";
import isAuth from "../middlewares/isAuth";
const router = Router()

router.post('/create-post', isAuth, postController.createPost)
router.get('/:id', isAuth, postController.getPost)
router.get('/', isAuth, postController.getPosts)

export default router
