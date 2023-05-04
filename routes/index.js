import express from  'express';
const router = express.Router();
import registerController from '../controllers/register.js';
router.post('/register',registerController.register

)

export default router;


