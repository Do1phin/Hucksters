import express from 'express';
import albumCtrl from '../controllers/album.controller.js';

const router = express.Router();

router.route('/albums/add')
    .post(albumCtrl.create);

router.route('/sellers/albums')
    .get(albumCtrl.list);


export default router;
