import cors from 'cors';
import express from 'express';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mailRouter from './router/mailRouter.js';
import { connectDB } from './utilities/connectDB.js'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); 
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(express.static(__dirname));
// app.get('/test', (req, res) => {
//     res.sendFile('index.html', { root: __dirname });
// });

connectDB(process.env.MONGODB_URL);
app.use('/api', mailRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

