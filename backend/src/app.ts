import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import { limiter } from "./middlewares/rate_limit_middleware"
dotenv.config();

import cors from 'cors';
import routes from './routes';
import express from 'express'
 
const app = express();

app.use(cors({

    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(limiter);
//Attaches auth to the request from frontend
app.use(clerkMiddleware());
app.use(express.json());


app.use('/api', routes)

export default app;