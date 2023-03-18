"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
exports.multerConfig = {
    dest: (0, path_1.resolve)(__dirname, '..', '..', '..uploads'),
    storage: (0, multer_1.diskStorage)({
        destination: (request, file, callback) => {
            callback(null, (0, path_1.resolve)(__dirname, '..', '..', 'uploads'));
        },
        filename: (request, file, callback) => {
            const filename = new Date().getTime().toString() + '.png';
            callback(null, filename);
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
        ];
        if (formats.includes(file.mimetype)) {
            callback(null, true);
        }
        else {
            callback(new Error('Formats not accepted'));
        }
    }
};
