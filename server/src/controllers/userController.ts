import { AppDataSource } from '../configs/db'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { User } from '../entities/User';
interface UserRequest {
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
    currentUserId: string
}

class UserController {
    async getUser (req: Request, res: Response) {
        const id = req.params.id
        try {
            const userModel = await AppDataSource.getRepository(User)
            const user = await userModel.findOne({ where: { id: parseInt(id) }})
            if (!user) {
                return res.status(400).json({ status: 'fail', msg: 'User not found' })
            }
            const { password, ...orthers } = user
            res.status(200).json({ status: 'success', user: orthers })
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }

    async updateUser (req: Request, res: Response) {
        const userRequest: UserRequest = req.body
        const { username, email, phone, firstname, lastname, profilePicture, coverPicture, livesin, about, currentUserId } = userRequest
        const id = req.params.id
        try {
            if (id !== currentUserId) {
                return res.status(400).json({ status: 'fail', msg: 'Not authorization '})
            }
            const userModel = await AppDataSource.getRepository(User)
            const user = await userModel.findOne({ where: { id: parseInt(id) }})
            if (!user) {
                return res.status(400).json({ status: 'fail', msg: 'User not found' })
            }
            user.username = username
            user.email = email
            user.phone = phone
            user.firstname = firstname
            user.lastname = lastname
            user.profilePicture = profilePicture
            user.coverPicture = coverPicture
            user.livesin = livesin
            user.about = about
            await userModel.save(user)
            return res.status(200).json({ status: 'success', user })
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }

    async softDelete (req: Request, res: Response) {
        const id = req.params.id
        try {
            const userModel = await AppDataSource.getRepository(User)
            const user = await userModel.findOne({ where: { id: parseInt(id) }})
            if (!user) {
                return res.status(400).json({ status: 'fail', msg: 'User not found' })
            }
            await userModel.softRemove(user)
            await userModel.save(user)
            res.status(200).json({ status: 'success', user})
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }
}


export default new UserController();