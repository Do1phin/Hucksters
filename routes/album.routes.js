import express from 'express';
import albumCtrl from '../controllers/album.controller.js';

const router = express.Router();

router.route('/albums/create')
    .post(albumCtrl.createAlbum);

router.route('/members/albums')
    .post(albumCtrl.readAlbum);

// router.route('/albums/update')
//     .post(albumCtrl.updateAlbum);

// router.route('/albums/delete')
//     .post(albumCtrl.deleteAlbum);

export default router;
