import express, { json, urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router } from './routes';

const app = express();

const { CLIENT_ORIGIN } = process.env;

const corsOptions = {
  origin: CLIENT_ORIGIN,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/', router);

export { app };
