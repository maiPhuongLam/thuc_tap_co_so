import express, {Request, Response} from 'express'
import { AppDataSource } from './configs/db'

const app = express()
const PORT = 5000

app.get('/test', (req: Request, res: Response) => {
    res.json({
        data: 'test'
    })
})

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
