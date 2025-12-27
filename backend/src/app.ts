import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import routes from './routes';
import express from 'express'
 
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', routes)

export default app;