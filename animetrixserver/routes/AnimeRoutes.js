import express from 'express';
import { addepisode, createAnime, deleteAnime, deleteEpisode, getAllAnimes, getAnimeEpisodes } from '../controllers/animeController.js';
import { authorizeAdmin, authorizeSubscribers, isAuthenticated } from '../middlewares/auth.js';
import singleUpload from '../middlewares/multer.js';

const router = express.Router();


router.route("/animes").get(getAllAnimes);
router.route("/createanime").post(isAuthenticated ,authorizeAdmin,singleUpload, createAnime);


router
  .route("/anime/:id")
  .get(isAuthenticated,authorizeSubscribers, getAnimeEpisodes)
  .post(isAuthenticated, authorizeAdmin,singleUpload, addepisode).delete(isAuthenticated, authorizeAdmin, deleteAnime);

  router.route("/episode").delete(isAuthenticated, authorizeAdmin, deleteEpisode);
export default router;