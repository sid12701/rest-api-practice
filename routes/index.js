import express from  'express';
const router = express.Router();
import auth from '../middlewares/auth.js';
import registerController from '../controllers/auth/register.js';
import loginController from '../controllers/auth/login.js';
import userController from '../controllers/auth/user.js';
import refreshController from '../controllers/auth/refresh.js';
import productController from '../controllers/productController.js';


router.post('/register',registerController.register);
router.post('/login',loginController.login);
router.get('/me',auth, userController.me);
router.post('/refresh',refreshController.refresh);
router.post('/logout',auth,loginController.logout);
router.post('/products',productController.store)

export default router;


