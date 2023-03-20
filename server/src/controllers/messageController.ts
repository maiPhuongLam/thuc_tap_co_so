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
}

export default new ChatController()
