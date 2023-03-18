import { Router } from "express";
import authController from "../controllers/authController";
import { check, body } from "express-validator"
const router = Router()

router.post(
    '/register',
    [
        body('username', 'Username field is required')
            .isLength({ min: 6 })
            .trim()
            .withMessage('Minimum length of username should be 6'),
        body('password', 'Password field is required')
            .isLength({ min: 6 })
            .isAlphanumeric()
            .trim()
            .withMessage('Invalid password'),
        check('phone', 'Phone field is required')
            .notEmpty()
            .isNumeric()
            .withMessage('Invalid phone number'),
        check('email', 'Email field is required')
            .notEmpty()
            .isEmail()
            .trim()
            .withMessage('Invalid email'),
        body('sex', 'Sex field is required')
            .notEmpty,
        body('dateOfbirth')
            
    ], 
    authController.register
)

router.post('/login',
    [
        body('username', 'Username field is required')
            .isLength({ min: 6 })
            .trim()
            .withMessage('Invalid username'),
        body('password', 'Password field is required')
            .isLength({ min: 6 })
            .isAlphanumeric()
            .trim()
            .withMessage('Invalid password'),
    ], 
    authController.login
)

export default router
