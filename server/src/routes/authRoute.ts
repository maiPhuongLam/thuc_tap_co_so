import { Router } from "express";
import authController from "../controllers/authController";
import { check, body } from "express-validator"
const router = Router()

router.post(
    '/register',
    [
        body('username')
            .isLength({ min: 6 })
            .withMessage('Minimum length of username should be 6')
            .trim(),
        body('password', 'Please enter password at least 6 character')
            .isLength({ min: 6 })
            .isAlphanumeric()
            .trim(),
    ], 
    authController.register
)

router.post('/login',
    [
        body('username')
                .isLength({ min: 6 })
                .withMessage('Minimum length of username should be 6')
                .trim(),
        body('password', 'Please enter password at least 6 character')
            .isLength({ min: 6 })
            .isAlphanumeric()
            .trim(),
    ], 
    authController.login
)

export default router
