import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./utils/index.js";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoute.js";
import taskRoutes from "./routes/taskRoute.js";
import notificationRoutes from "./routes/notificationroute.js";
import cron from "node-cron";
import axios from "axios";
import  sendReminderEmail  from "./utils/mailer.js";
import Task from './models/task.js';
import User from './models/user.js';
import Notification from "./models/notification.js";


dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

const ONE_HOUR = 1000 * 60 * 60;

// const checkTasksForReminders = async () => {
//   try {
//     const tasks = await Task.find().populate('user_id'); 
//     const now = new Date();

//     tasks.forEach(task => {
//       const endTime = new Date(task.end_time);
//       const reminderTime = new Date(endTime.getTime() - ONE_HOUR);

//       if (now >= reminderTime && now < endTime) {
//         const userEmail = task.user_id.email;
//         sendReminderEmail(userEmail, 'Task Reminder', `Reminder: Your task "${task.title}" is ending in one hour.`);
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching tasks:', error);
//   }
// };

const checkTasksForRemindersnotification = async () => {
    try {
      const tasks = await Task.find().populate('user_id');
      const now = new Date();
  
      tasks.forEach(async (task) => {
        const endTime = new Date(task.end_time);
        const reminderTime = new Date(endTime.getTime() - ONE_HOUR);
  
        if (now >= reminderTime && now < endTime) {
          const newNotification = new Notification({
            user: task.user_id._id,
            task: task._id,
            message: `Reminder: Your task "${task.title}" is ending in one hour.`,
            status: 'unread'
          });
          await newNotification.save();
        }
      });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  

cron.schedule('* * * * *', () => {
  console.log('Checking tasks for reminders...');
//   checkTasksForReminders();
checkTasksForRemindersnotification();
});

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notifications', notificationRoutes);

app.use(routeNotFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
