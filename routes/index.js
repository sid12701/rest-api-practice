import express from  'express';
const router = express.Router();
import registerController from '../controllers/auth/register.js';
import loginController from '../controllers/auth/login.js';
import userController from '../controllers/auth/user.js';
import auth from '../middlewares/auth.js';
router.post('/register',registerController.register);
router.post('/login',loginController.login);
router.get('/me',auth, userController.me);


export default router;


