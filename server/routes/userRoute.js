import express from 'express';
import { registerUser, loginUser, getUser } from '../controllers/userController.js';
import  auth  from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', auth, getUser);

export default router;
