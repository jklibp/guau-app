import {Router} from 'express';
import { register, login, logout, profilecustomer} from '../controllers/auth.controllers.js';
import {authRequired} from '../middlewares/validateToken.js';
const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout',logout);
router.get('/profilecustomer',authRequired,profilecustomer);

export default router
