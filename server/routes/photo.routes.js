import express from 'express';
import photoCtrl from '../controllers/photo.controller.js';

const router = express.Router();

router.route('/photos')
    .post(photoCtrl.create);

export default router;
