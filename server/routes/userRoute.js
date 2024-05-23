// routes/userRoutes.js
import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.getUser);

module.exports = router;