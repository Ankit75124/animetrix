import express from 'express';
import { createAnime, getAllAnimes } from '../controllers/animeController.js';

const router = express.Router();


router.route("/animes").get(getAllAnimes);
router.route("/createanime").post(createAnime);

export default router;