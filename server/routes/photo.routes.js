import express from 'express';
import photoCtrl from '../controllers/photo.controller.js';

const router = express.Router();

router.route('/photos/add')
    .post(photoCtrl.create);

router.route('/sellers/albums/photos')
    .get(photoCtrl.list);

export default router;
