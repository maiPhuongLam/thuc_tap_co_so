import { Router } from "express";
import postController from "../controllers/postController";
import isAuth from "../middlewares/isAuth";
const router = Router()

router.post('/create-post', isAuth, postController.createPost)
router.get('/:postId', isAuth, postController.getPost)
router.get('/', isAuth, postController.getPosts)
router.get('/user/:userId', isAuth, postController.getPostsOfUser)
router.put('/:postId', isAuth, postController.updatePost)
router.delete('/:postId', isAuth, postController.deletePost)

export default router
