const registerController = {
    register(req,res,next){
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


        res.json({msg:"Hello from Express"});

    }

}



export default registerController;