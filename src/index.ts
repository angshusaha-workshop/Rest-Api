import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/', router());

const preferredPort = Number(process.env.PORT) || 8080;

const startServer = (port: number) => {
    const server = http.createServer(app);

    server.on('error', (error: NodeJS.ErrnoException) => {
        if (error.code === 'EADDRINUSE') {
            const nextPort = port + 1;
            console.warn(`Port ${port} is already in use. Trying ${nextPort} instead.`);
            startServer(nextPort);
            return;
        }

        console.error('Server startup error:', error);
        process.exit(1);
    });

    server.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}/`);
    });
};

mongoose.Promise = Promise;

if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('MongoDB Connected Successfully');
        })
        .catch((error: Error) => {
            console.error('MongoDB Connection Error:', error);
        });

    mongoose.connection.on('error', (error: Error) => {
        console.error(error);
    });
} else {
    console.warn('MONGO_URI is not configured. Server will start without a database connection.');
}

startServer(preferredPort);
