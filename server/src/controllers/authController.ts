import { AppDataSource } from '../configs/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { User } from '../entities/User'
import { Repository } from 'typeorm'
import { validationResult, param } from 'express-validator'
import { Sex } from '../entities/User'


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

    // async resetPassword (req: Request, res: Response) {
    //     const authRequest: AuthRequest = req.body
    //     const { username, email } = authRequest
    //     try {
    //         const userRepo: Repository<User> = await AppDataSource.getRepository(User)
    //         const user = await userRepo.findOne({ where: { username } || { email }})
    //         if (!user) {
    //             return res.status(400).json({ status: 'fail', msg: 'Username or email is incorrect' })
    //         }
    //         const token = await createToken(user.id)
    //         const transporter = nodemailer.createTransport({
    //             service: 'gmail',
    //             auth: {
    //                 user: 'maiphuonglambh.2002@gmail.com',
    //                 pass: Math.floor(Math.random() * 10000000)
    //             }
    //         });
    //         const mailOptions = {
    //             from: 'test.2002@gmail.com',
    //             to: req.body.email,
    //             subject: 'Password reset',
    //             html: `
    //                 <p>You requested a password reset</p>
    //                 <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
    //             `
    //         };
    //         transporter.sendMail(mailOptions, (error: Error, info: any) => {
    //             if (error) {
    //                 console.log(error);
    //             } else {
    //                 console.log('Email sent: ' + info.response);
    //             }
    //         });
    //     } catch (error) {
    //         let msg
    //         if (error instanceof Error) {
    //             msg = error.message
    //         }
    //         res.status(500).json({ status: 'fail', msg })
    //     }
    // }

    // async createNewPassword (req: Request, res: Response) {
    //     const authRequest: AuthRequest = req.body
    //     const { username, email } = authRequest
    // }
}

export default new AuthController()