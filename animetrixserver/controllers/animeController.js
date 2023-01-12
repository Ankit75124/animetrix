import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import {Anime} from "../models/Anime.js";



export const getAllAnimes = catchAsyncError(async (req,res,next) =>{  
    const animes =await Anime.find();
    res.status(200).json({
        sucess: true,
        animes,
    });
});