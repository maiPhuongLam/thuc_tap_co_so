import { AppDataSource } from '../configs/db'
import { Request, Response } from 'express'
import { Message } from '../entities/Message'
import { Repository } from 'typeorm'
import { validationResult } from 'express-validator'
import { Chat } from '../entities/Chat'

interface MessageRequest {
    text: string
}

class ChatController {
    async addMessage(req: Request, res: Response) {
        const userId = req.userId!
        const chatId = req.params.chatId
        const messageRequest: MessageRequest = req.body
        const { text } = messageRequest
        try {
            const messageRepo: Repository<Message> = await AppDataSource.getRepository(Message)
            const newMessage = await new Message()
            newMessage.chatId = parseInt(chatId)
            newMessage.senderId = parseInt(userId)
            newMessage.text = text
            await newMessage.save()
            res.status(200).json({ status: 'success', data: newMessage })
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }

    async userChat(req: Request, res: Response) {
        const userId1 = req.userId!
        try {
            const chatRepo: Repository<Chat> = await AppDataSource.getRepository(Chat)
            const userChats: Chat[] = await chatRepo.find({ where: { userId1: parseInt(userId1) }})
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
        const userId1 = req.userId!
        const userId2 = req.params.userId
        try {
            const chatRepo: Repository<Chat> = await AppDataSource.getRepository(Chat)
            const chat = await chatRepo.findOne({ where: { userId1: parseInt(userId1), userId2: parseInt(userId2) }})
            if (chat) {
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
