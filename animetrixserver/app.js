import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";

config({
  path: "./config/config.env",
});
const app = express();


// Using Middlewares
app.use(express.json());
app.use(express.urlencoded({
  extended:true,
}));

app.use(cookieParser());


// Importing and Using Routes
import anime from "./routes/AnimeRoutes.js";
import user from "./routes/userRoutes.js";


app.use("/api/v1", anime);
app.use("/api/v1", user);

export default app;


app.use(ErrorMiddleware);