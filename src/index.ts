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

const server = http.createServer(app);
const port = Number(process.env.PORT) || 8080;

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});

const MONGO_URL = "mongodb+srv://angshusaha777_db_user:cbHDXuGpjxHwZ9Tg@cluster0.jfgggac.mongodb.net/";


mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/',router());