import Joi from "joi";
import { User ,RefreshToken} from "../../models/index.js";
import customErrorHandler from "../../services/customErrorHandler.js";
import bcrypt from "bcrypt";
import JwtService from "../../services/JwtService.js";
import { REFRESH_SECRET } from "../../config/index.js";
const loginController = {
  async login(req, res, next) {
    const loginSchema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });

    const { error } = loginSchema.validate(req.body);

    if (error) {
      return next(error);
    }
    let user;
    try {
       user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(customErrorHandler.wrongCredentials());
      }
    } catch (err) {
      return next(err);
    }

    //compare password
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return next(customErrorHandler.wrongCredentials());
    }
    const access_token = JwtService.sign({
      _id: user._id,
      role: user.role,
    });
    const refresh_token = JwtService.sign({_id:user._id,role:user.role},'1y',REFRESH_SECRET);
    //database whitelist
    await RefreshToken.create({token: refresh_token});

    res.json({ access_token,refresh_token });
  },

  async logout(req,res,next){
    try{ 
      const refreshSchema = Joi.object({
        refresh_token: Joi.string().required(),
    });
    const { error } = refreshSchema.validate(req.body);

    if (error) {
        return next(error);
    }

      await RefreshToken.deleteOne({token: req.body.refresh_token});
    }
    catch(err){
      return next(new Error("Something went wrong" + err.message))
    }
    res.json({message:"Logged out successfully"});
    console.log("hello")
  }

};

export default loginController;
