import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import history from 'connect-history-api-fallback';
import RoutesApi from './routes';

const app = express();

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

app.use("/u", RoutesApi)

app.use(history({
    index: '/index.html'
}));

app.use(express.urlencoded({ extended: true }));

export default app;
