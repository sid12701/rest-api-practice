import Joi from "joi";
import { User } from "../../models/index.js";
import customErrorHandler from "../../services/customErrorHandler.js";
import bcrypt from "bcrypt";
import JwtService from "../../services/JwtService.js";
import { REFRESH_SECRET } from "../../config/index.js";
import RefreshToken from "../../models/refreshToken.js";
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
};

export default loginController;
