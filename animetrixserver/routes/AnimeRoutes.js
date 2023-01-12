import express from 'express';
import { getAllAnimes } from '../controllers/animeController.js';

const router = express.Router();


router.route("/animes").get(getAllAnimes);

export default router;