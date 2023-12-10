import express from 'express';
import { SERVER_PORT } from './constants/app.constant.js'

import usersRouter from './routers/users.router.js';
import productsRouter from './routers/products.router.js';
import authRouter from './routers/auth.router.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();
app.use(express.json());

app.use('/api', express.urlencoded({ extended: true }), usersRouter);
app.use('/api', authRouter);
app.use('/api', productsRouter);
app.use(errorMiddleware);


app.listen(SERVER_PORT, () => {
    console.log(`App listening on port ${SERVER_PORT}`);
});