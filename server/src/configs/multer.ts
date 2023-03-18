import { diskStorage, Options } from "multer"
import { resolve } from 'path'
import bcrypt from 'bcrypt'
import { error } from "console"

export const multerConfig = {
    dest: resolve(__dirname, '..', '..', '..uploads'),
    storage: diskStorage({
        destination: (request, file, callback) => {
            callback(null, resolve(__dirname, '..', '..', 'uploads'))
        },
        filename: (request, file, callback) => {
            const filename = new Date().getTime().toString() + '.png'
            callback(null, filename)
        },
    }),
    limits: {
        fileSize: 5 * 1024 * 10
    },
    fileFilter: (request, file, callback) => {
        const formats = [
            'image/jpeg',
            'image/jpg',
            'image/png'
        ]
        if (formats.includes(file.mimetype)) {
            callback(null, true)
        } else {
            callback(new Error('Formats not accepted'))
        }
    }
} as Options