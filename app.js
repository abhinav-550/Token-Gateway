import express from 'express';
import cookieParser from 'cookie-parser';
import { connection } from './database/connection.js';
import dotenv from "dotenv"
import cors from "cors"
import userRoutes from "./routes/userRouter.js"
import session from 'express-session';
import { errorMiddleWare } from './middlewares/Error.js';
import ejsMate from "ejs-mate"
import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const app = express();

dotenv.config({
    path: "./config/config.env"
})

app.engine('ejs',ejsMate);
app.use(express.urlencoded({extended:true})); 
app.use(express.json());
app.use(express.static(path.join(__dirname,'/public')));
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))
app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge:  process.env.SESSION_EXPIRE* 24 * 60 * 60 * 1000
    }
}))
app.set('view engine', 'ejs');


connection();

app.use("/user", userRoutes);


app.get('/' , (req, res , next) => {
    res.render("index.ejs");
})

app.use(errorMiddleWare);
export default app;
