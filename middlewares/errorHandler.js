import { DEBUG_MODE } from "../config/index";
import { ValidationError } from "joi";

const errorHandler = (err, req, res, next) => {
    let statusCode = 500;

    let data = {
        message: "Internal Server Error",
        ...(DEBUG_MODE==="true" && {originalError: err.message})
    }

    if(err instanceof ValidationError){
        statusCode = 422;
        data = {
            message: err.message
        }
    }

}


export default errorHandler;