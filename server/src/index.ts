import express, {Request, Response} from 'express'
import { AppDataSource } from './configs/db'
import http from 'http'
import cors from 'cors'
import multer from 'multer'
import { multerConfig } from './configs/multer'
import authRoute from './routes/authRoute'
import userRoute from './routes/userRoute'
import followRoute from './routes/followRoute'
import postRoute from './routes/postRoute'
import chatRoute from './routes/chatRoute'
import messageRoute from './routes/messageRoute'
import path from 'path'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const PORT = 5000
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    }
})

app.use(cors())
app.use(express.json())
app.use(multer({ storage: multerConfig.storage, fileFilter: multerConfig.fileFilter }).single('image'));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/follow', followRoute)
app.use('/post', postRoute)
app.use('/chat', chatRoute)
app.use('/message', messageRoute)

const startApp = async () => {
    try {
        const connection = await AppDataSource.initialize()
        if (connection) {
            console.log('Connect db success');
            await server.listen(PORT, (): void => {
                console.log(`Server is running on port: ${PORT}`)
            })
            io.on('connection', (socket) => {
                console.log('User is connected')
                socket.on('disconnect', () => {
                    console.log('User is disconnected')
                })
            })
        } else {
            console.log('Connect db fail');
        }
    } catch (error) {
        console.log(error);
        console.log('Connect db fail');
    }
}

startApp()

