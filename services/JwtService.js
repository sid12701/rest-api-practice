import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.js';

class JwtService{
    static sign(payload,expiry='60s',secret=JWT_SECRET){
        // sign token
        return jwt.sign(payload,secret,{expiresIn: expiry})
    }
}


export default JwtService;