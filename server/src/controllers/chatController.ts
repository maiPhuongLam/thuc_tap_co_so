import { AppDataSource } from '../configs/db'
import { Request, Response } from 'express'
import { Repository } from 'typeorm'
import { validationResult } from 'express-validator'

interface ChatRequest {
    desc: string
    image: string
}

class ChatController {
    async createChat (req: Request, res: Response) {
       
    }
}

export default new ChatController()