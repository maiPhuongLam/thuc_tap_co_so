import express, {Request, Response} from 'express'
import { AppDataSource } from './configs/db'
import cors from 'cors'
import multer from 'multer'
import { multerConfig } from './configs/multer'
import authRoute from './routes/authRoute'
import userRoute from './routes/userRoute'
import followRoute from './routes/followRoute'
import postRoute from './routes/postRoute'
import path from 'path'

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())
app.use(multer({ storage: multerConfig.storage, fileFilter: multerConfig.fileFilter }).single('image'));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/follow', followRoute)
app.use('/post', postRoute)

const startApp = async () => {
    try {
        const connection = await AppDataSource.initialize()
        if (connection) {
            console.log('Connect db success');
            await app.listen(PORT, (): void => {
                console.log(`Server is running on port: ${PORT}`)
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

