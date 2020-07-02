import 'reflect-metadata';
import express, { Request, Response, NextFunction} from 'express';
// src/server.ts
import 'express-async-errors';
import routes from './routes/index';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

//connection database by typeorm
import './database';


const app = express();

app.use(express.json());
//route static files
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

//middleware for errors
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })

});

// app.get('/', (request, response) => {
//     return response.json({ message: 'Hello World'})
// })

app.listen(3333, () => {
    console.log("Server is running on port 3333");
})


