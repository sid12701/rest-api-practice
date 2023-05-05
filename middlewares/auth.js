import JwtService from "../services/JwtService.js";
import customErrorHandler from "../services/customErrorHandler.js";
const auth = async (req,res,next)=>
{
    let authHeader = req.headers.authorization;
    if(!authHeader){
        return next(customErrorHandler.unAuthorized());
    }

    const token = authHeader.split(' ')[1];

    try{
        const {_id,role} = await JwtService.verify(token);
        const user = {
            _id,
            role
        }
        req.user = user;
        next();
   
    }
   
    catch(err){
        return next(customErrorHandler.unAuthorized());
    }
}

export default auth;