//this file will contain all the configuration variables for the project
//it will be used to export all the variables that we need to use in our project
import dotenv from 'dotenv';
dotenv.config();

export const {
    APP_PORT ,
    DEBUG_MODE,
} = process.env;