import express from 'express';
import { addepisode, createAnime, getAllAnimes, getAnimeEpisodes } from '../controllers/animeController.js';
import singleUpload from '../middlewares/multer.js';

const router = express.Router();


router.route("/animes").get(getAllAnimes);
router.route("/createanime").post(singleUpload,createAnime);


router.route("/anime/:id").get(getAnimeEpisodes).post(singleUpload,addepisode);

export default router;