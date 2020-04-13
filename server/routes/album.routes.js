import express from 'express';
import Album from '../models/album.model.js';
import albumCtrl from '../controllers/album.controller.js';

const router = express.Router();

router.route('/albums/add')
    .post(albumCtrl.create);

export default router;
