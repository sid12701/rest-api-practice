import User from '../../models/user.js';

const userController = {
    async me(req,res,next){
        try{
            const user = await User.findOne({_id:req.user.id});
            if(!user){
                return next(customErrorHandler.notFound());
            }
            res.json(user);
        }
        catch(err){
            return next(err);
        }

    }
}


export default userController;