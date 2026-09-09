import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config({});

const app = express();

// MiddleWare 
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
}
app.use(cors(corsOptions));


app.get("/", (req, res) => {
    res.send("hello from server");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running at ${PORT} http://localhost:${PORT}`)
    connectDB()
});