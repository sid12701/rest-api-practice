//we can use import in our project here due to the esm package which allows us to use es6 modules in nodejs
import express from 'express';
import { APP_PORT } from './config/index.js'; //We do not need to 
import mongoose from 'mongoose';
import routes from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';
import { DB_URL } from './config/index.js';
import path from 'path';
const app = express();
global.appRoot = path.dirname(new URL(import.meta.url).pathname);app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use('/api',routes);

mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true,family:4}).then(()=>{
    console.log('Database connected');
});


app.use(errorHandler)

app.listen(APP_PORT,()=>{console.log(`Server running on port ${APP_PORT}`)})