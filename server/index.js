import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./utils/index.js";

dotenv.config();

const routes= "";
//db 
connectDB()

const PORT = process.env.port || 5000

const app = express();

app.use(cors({
    origin : ["http://localhost:5173" , "http://localhost:3000 "],
    methods: ["GET", "POST" , "PUT" ,"DELETE"],
    credentials : true,

}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded());
// app.use("/api",routes);

// app.use(routeNotFound)
// app.use(errorHandler)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});