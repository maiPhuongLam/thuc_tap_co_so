import { AppDataSource } from '../configs/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { User } from '../entities/User'
import { Repository } from 'typeorm'
import { validationResult, param } from 'express-validator'
import { Sex } from '../entities/User'
import nodemailer from 'nodemailer'

const createToken = (userId: number) => {
    return jwt.sign({ userId }, 'thuc_tap_co_so', {expiresIn: '1d'})
}
interface AuthRequest {
    username: string
    email: string
    phone: string
    password: string
    confirmPassword: string
    firstname: string
    lastname: string
    profilePicture: string
    coverPicture: string
    livesin: string
    about: string
    dateOfBirth: string
    sex: Sex
}

class AuthController {
    async register (req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'fail', msg: errors.array()[0].msg })
        }
        const authRequest: AuthRequest = req.body
        const { username, email, phone, password, confirmPassword, firstname, lastname, dateOfBirth, sex } = authRequest
        try {
            const userRepo: Repository<User> = await AppDataSource.getRepository(User)
            const user = await userRepo.findOne({ where: { username }})
            if (user) {
                return res.status(400).json({ status: 'fail', msg: 'Username is exist' })
            }
            const existEmail = await userRepo.findOne({ where: { email }})
            if (existEmail) {
                return res.status(400).json({ status: 'fail', msg: 'Email is already used to register another account' })
            }
            const existPhone = await userRepo.findOne({ where: { phone }})
            if (existPhone) {
                return res.status(400).json({ status: 'fail', msg: 'Phone is already used to register another account' })
            }
            if (password !== confirmPassword) {
                return res.status(400).json({ status: 'fail', msg: 'Confirm password have to match' })
            }
            const salt = await bcrypt.genSalt(10)
            const hasdedPass = await bcrypt.hash(password, salt)
            const newUser: User = await new User()
            newUser.username = username
            newUser.email = email
            newUser.phone = phone
            newUser.password = hasdedPass
            newUser.firstname = firstname
            newUser.lastname = lastname
            newUser.coverPicture = 'https://i.pinimg.com/originals/4f/f4/09/4ff40958bc4d78882c0d44be38753f14.jpg'
            newUser.profilePicture = 'https://cdn2.vectorstock.com/i/1000x1000/56/71/avatar-user-icon-vector-21105671.jpg'
            newUser.dateOfBirth = dateOfBirth
            newUser.sex = sex
            newUser.livesin = 'null'
            newUser.about = 'null'
            newUser.isAdmin = false
            newUser.isDeleted = false
            // newUser.createdAt = new Date()
            // newUser.updatedAt = new Date()
            await userRepo.save(newUser)
            return res.status(201).json({ status: 'success', data: newUser })
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }

    async login (req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'fail', msg: errors.array()[0].msg })
        }
        const authRequest: AuthRequest = req.body
        const { username, password } = authRequest
        try {
            const userRepo: Repository<User> = await AppDataSource.getRepository(User)
            const user = await userRepo.findOne({ where: { username }})
            if (!user) {
                return res.status(400).json({ status: 'fail', msg: 'User not found' })
            }
            const isEqual = await bcrypt.compare(password, user.password)
            if (!isEqual) {
                return res.status(400).json({ status: 'fail', msg: 'Incorrect password' })
            }
            if(user.isDeleted === true) {
                return res.status(400).json({ status: 'fail', msg: 'User not found' })
            }
            const token = await createToken(user.id)
            res.status(200).json({ status: 'success', data: { userId: user.id, token } })
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }

    async resetPassword (req: Request, res: Response) {
        const authRequest: AuthRequest = req.body
        const { username, email } = authRequest
        try {
            const userRepo: Repository<User> = await AppDataSource.getRepository(User)
            const user = await userRepo.findOne({ where: { username } || { email }})
            if (!user) {
                return res.status(400).json({ status: 'fail', msg: 'Username or email is incorrect' })
            }
            const newPassword: string = await Math.floor(Math.random() * 1000000).toString()
            const salt = await bcrypt.genSalt(10)
            const newHassPassword = await bcrypt.hash(newPassword, salt)
            const transporter = await nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "3cd274007d941a",
                    pass: "60374a09de842d"
                }
            });
            const mailOptions = {
                from: 'Sky app <446df79f0f-82456a@inbox.mailtrap.io>',
                to: email,
                subject: 'Password reset',
                html: `
                    <p>🚨 New password: ${newPassword}</p>
                    <p>🚨 Click this <a href="http://localhost:3000/login/">link</a> to login again. 😱</p>
                `
            };
            await transporter.sendMail(mailOptions)
            user.password = newHassPassword
            await user.save()
            res.status(200).json({ status: 'success', msg: 'email sended' })
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }
}

export default new AuthController()