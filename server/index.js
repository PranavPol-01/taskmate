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

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

// Configure CORS
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // Add your frontend origins here
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Enable sending cookies with requests
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
