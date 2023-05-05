import Joi from 'joi';
import customErrorHandler from '../../services/customErrorHandler.js';
import {User} from "../../models/index.js";
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService.js';
const  registerController = {
    async register(req,res,next){
        const registerSchema = Joi.object({
            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
        
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        
            repeat_password: Joi.ref('password'),
            email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    })



        const {error} = registerSchema.validate(req.body);

        if(error){
            throw error;
        }
        //checking if the user exists in the database
        try{
            const exist = await User.exists({email:req.body.email});
            if(exist){
                return next(customErrorHandler.alreadyExists("This email has a registered account already"));
            }
        }

        catch(err){
            return next(err);
        }


        //Hashing the password to store it
        const hashedPassword = await bcrypt.hash(req.body.password,10);

        const user = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        })

        let access_token;
        try{
            const result = await user.save();

            //creating token
            access_token = JwtService.sign({_id:result._id,role:result.role});
        }
        catch(err){
            return next(err);
        }


        res.json({access_token:access_token});

    }

}



export default registerController;