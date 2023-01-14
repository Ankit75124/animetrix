import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Anime } from "../models/Anime.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

export const getAllAnimes = catchAsyncError(async (req, res, next) => {
  const animes = await Anime.find().select("-episodes");
  res.status(200).json({
    sucess: true,
    animes,
  });
});

export const createAnime = catchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy) {
    return next(new ErrorHandler("Please add all details", 400));
  }

  const file = req.file;

  const fileUri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await Anime.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  res.status(201).json({
    sucess: true,
    message: "Anime created Successfully, you can add videos now",
  });
});

export const getAnimeEpisodes = catchAsyncError(async (req, res, next) => {
  const anime = await Anime.findById(req.params.id);

  if (!anime) return next(new ErrorHandler("Anime not found", 404));

  anime.views += 1;

  await anime.save();

  res.status(200).json({
    sucess: true,
    episodes: anime.episodes,
  });
});

export const addepisode = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const { title, description } = req.body;

  const anime = await Anime.findById(id);

  if (!anime) return next(new ErrorHandler("Anime not found", 404));

  const file = req.file;

  const fileUri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content, {
    resource_type: "video",
  });

  anime.episodes.push({
    title,
    description,
    video: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  anime.noOfVideos = anime.episodes.length;

  await anime.save();

  res.status(200).json({
    sucess: true,
    message: "Episode added successfully",
  });
});

export const deleteAnime = catchAsyncError(async (req, res, next) => {

    const { id } = req.params;
  const anime = await Anime.findById(id);


  if (!anime) return next(new ErrorHandler("Anime not found", 404));

  await cloudinary.v2.uploader.destroy(anime.poster.public_id);

  for (let i = 0; i < anime.episodes.length; i++) {
    const sigleEpisode = anime.episodes[i];
    await cloudinary.v2.uploader.destroy(sigleEpisode.video.public_id,{resource_type:"video"});
  }

  await anime.remove();

  res.status(200).json({
    sucess: true,
    message: "Anime Deleted Successfully",
  });
});


export const deleteEpisode = catchAsyncError(async (req, res, next) => {

  const { animeId,episodeId } = req.query;


  const anime = await Anime.findById(animeId);

  if (!anime) return next(new ErrorHandler("Anime not found", 404));

  const episode = anime.episodes.find((item) => {
    if (item._id.toString() === episodeId.toString()) {
      return item;
    }
  });

  await cloudinary.v2.uploader.destroy(episode.video.public_id, {
    resource_type: "video",
  });

  anime.episodes = anime.episodes.filter((item)=>{
    if(item._id.toString() !== episodeId.toString()){
      return item;
    }
  })

  anime.noOfVideos = anime.episodes.length;

  await anime.save();

  res.status(200).json({
    sucess: true,
    message: "Episode Deleted Successfully",
  });
});