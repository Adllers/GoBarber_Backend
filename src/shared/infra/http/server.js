"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var celebrate_1 = require("celebrate");
// src/server.ts
require("express-async-errors");
var index_1 = __importDefault(require("./routes/index"));
var upload_1 = __importDefault(require("@config/upload"));
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var rateLimiter_1 = __importDefault(require("./middlewares/rateLimiter"));
//connection database by typeorm
require("@shared/infra/typeorm");
require("@shared/container");
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
//route static files
app.use('/files', express_1.default.static(upload_1.default.uploadsFolder));
app.use(rateLimiter_1.default);
app.use(index_1.default);
app.use(celebrate_1.errors());
//middleware for errors
app.use(function (err, request, response, next) {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
// app.get('/', (request, response) => {
//     return response.json({ message: 'Hello World'})
// })
app.listen(3333, function () {
    console.log("Server is running on port 3333");
});
