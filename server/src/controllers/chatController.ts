import { AppDataSource } from '../configs/db'
import { Request, Response } from 'express'
import { Message } from '../entities/Message'
import { Repository } from 'typeorm'
import { validationResult } from 'express-validator'
import { where } from 'sequelize'
import { Chat } from '../entities/Chat'

class ChatController {
    async createChat(req: Request, res: Response) {
        const user1Id = req.userId!
        const user2Id = req.params.userId
        try {
            const chatRepo: Repository<Chat> = await AppDataSource.getRepository(Chat)
            const chatExist: Chat | null = await chatRepo.findOne({ where: { user1Id: parseInt(user1Id), user2Id: parseInt(user2Id) }})
            if (chatExist) {
                return res.status(403).json({ status: 'fail', msg: 'Action forbidden'})
            }
            const newChat: Chat = await new Chat()
            newChat.user1Id = parseInt(user1Id)
            newChat.user2Id = parseInt(user2Id)
            await newChat.save()
            res.status(200).json({ status: 'success', data: newChat })
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }

    async userChat(req: Request, res: Response) {
        const user1Id = req.userId!
        try {
            const chatRepo: Repository<Chat> = await AppDataSource.getRepository(Chat)
            const userChats: Chat[] = await chatRepo.find({ where: { user1Id: parseInt(user1Id) }})
            if (userChats.length === 0) {
                return res.status(200).json({ status: 'success', msg: 'User no chat' })
            }
            return res.status(200).json({status: 'success', data: userChats})
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }

    async getChat(req: Request, res: Response) {
        const user1Id = req.userId!
        const user2Id = req.params.userId
        try {
            const chatRepo: Repository<Chat> = await AppDataSource.getRepository(Chat)
            const chat: Chat | null = await chatRepo.findOne({ where: { user1Id: parseInt(user1Id), user2Id: parseInt(user2Id) }})
            if (!chat) {
                return res.status(403).json({ status: 'fail', msg: 'Chat is not found'})
            }
            res.status(200).json({ status: 'success', data: chat })
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }
}

export default new ChatController()
