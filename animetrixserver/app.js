import express from "express";
import { config } from "dotenv";


config({
  path: "./config/config.env",
});
const app = express();


// Importing and Using Routes
import anime from "./routes/AnimeRoutes.js";
import user from "./routes/userRoutes.js";
import ErrorMiddleware from "./middlewares/Error.js";

app.use("/api/v1", anime);
app.use("/api/v1", user);

export default app;


app.use(ErrorMiddleware);