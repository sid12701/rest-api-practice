//we can use import in our project here due to the esm package which allows us to use es6 modules in nodejs
import express from 'express';
import { APP_PORT } from './config/index.js'; //We do not need to 
import mongoose from 'mongoose';
import routes from './routes/index.js';
const app = express();
app.use(express.json());

app.use('/api',routes);

mongoose.connect('mongodb://localhost:27017/rest-api', {useNewUrlParser: true, useUnifiedTopology: true,family:4}).then(()=>{
    console.log('Database connected');
});


app.listen(APP_PORT,()=>{console.log(`Server running on port ${APP_PORT}`)})