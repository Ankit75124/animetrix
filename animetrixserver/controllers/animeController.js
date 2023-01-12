import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Anime } from "../models/Anime.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getAllAnimes = catchAsyncError(async (req, res, next) => {
  const animes = await Anime.find().select("-episodes");
  res.status(200).json({
    sucess: true,
    animes,
  });
});

export const createAnime = catchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy)
    {return next(new ErrorHandler("Please add all details", 400));}

//   const file = req.file;

  await Anime.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: "temp",
      url: "temp",
    },
  });

  res.status(201).json({
    sucess: true,
    message: "Anime created Successfully, you can add videos now",
  });
});
