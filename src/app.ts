import express, { json, urlencoded } from 'express';
import { router } from './routes';

const app = express();

app.use(json());
app.use(urlencoded());
app.use('/', router);

export { app };
