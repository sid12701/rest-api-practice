import User from '../models/user.js';
import customErrorHandler from '../services/customErrorHandler.js';

const admin = async (req,res,next) => {
    try{
        const user = await User.findOne({_id: req.user._id});

        if(user.role ==='admin'){
            next();

        }else{
            return next(customErrorHandler.unAuthorized());
        }
    }
    catch(err){
        return next(customErrorHandler.serverError());
    }
}

export default admin;