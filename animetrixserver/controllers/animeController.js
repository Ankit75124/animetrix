import {Anime} from "../models/Anime.js";



export const getAllAnimes = async (req,res,next) =>{  
    const animes =await Anime.find();
    res.status(200).json({
        sucess: true,
        animes,
    });
};