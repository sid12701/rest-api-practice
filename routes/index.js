import express from  'express';
const router = express.Router();
import registerController from '../controllers/auth/register.js';
import loginController from '../controllers/auth/login.js';
router.post('/register',registerController.register);
router.post('/login',loginController.login);


export default router;


