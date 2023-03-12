import { AppDataSource } from '../configs/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { User } from '../entities/User';

const createToken = (userId: number) => {
    return jwt.sign({ userId }, 'thuc_tap_co_so', {expiresIn: '1d'})
}

interface AuthRequest {
    username: string
    email: string
    phone: string
    password: string
    firstname: string
    lastname: string
    profilePicture: string
    coverPicture: string
    livesin: string
    about: string
}

class AuthController {
    async register (req: Request, res: Response) {
        const authRequest: AuthRequest = req.body
        const { username, email, phone, password, firstname, lastname, profilePicture, coverPicture, livesin, about } = authRequest
        try {
            const userModel = await AppDataSource.getRepository(User)
            const user = await userModel.findOne({ where: { username }})
            if (user) {
                return res.status(400).json({ status: 'fail', msg: 'User is exist' })
            }
            const salt = await bcrypt.genSalt(10)
            const hasdedPass = await bcrypt.hash(password, salt)
            const newUser = await new User()
            newUser.username = username
            newUser.email = email
            newUser.phone = phone
            newUser.password = hasdedPass
            newUser.firstname = firstname
            newUser.lastname = lastname
            newUser.profilePicture = profilePicture
            newUser.coverPicture = coverPicture
            newUser.livesin = livesin
            newUser.about = about
            newUser.isAdmin = false
            newUser.isDeleted = false
            await userModel.save(newUser)
            return res.status(201).json({ status: 'success', user: newUser })
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }

    async login (req: Request, res: Response) {
        const authRequest: AuthRequest = req.body
        const { username, password} = authRequest
        try {
            const userModel = await AppDataSource.getRepository(User)
            const user = await userModel.findOne({ where: { username }})
            if (!user) {
                return res.status(400).json({ status: 'fail', msg: 'User not found' })
            }
            const isEqual = await bcrypt.compare(password, user.password)
            if (!isEqual) {
                return res.status(400).json({ status: 'fail', msg: 'Incorrect password' })
            }
            const token = await createToken(user.id)
            res.status(200).json({ status: 'success', user, token })
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }
}

export default new AuthController();