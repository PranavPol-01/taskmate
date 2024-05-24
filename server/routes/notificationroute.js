import express from "express";
const router = express.Router();
import notificationController from "../controllers/notficationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

router.post('/', authMiddleware, notificationController.createNotification);
router.get('/', authMiddleware, notificationController.getNotifications);
router.delete('/:id', authMiddleware, notificationController.deleteNotification);

export default router;
