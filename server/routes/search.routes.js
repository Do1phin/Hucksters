import express from 'express';
import searchCtrl from '../controllers/search.controller.js';

const router = express.Router();

router.route('/search')
    .get(searchCtrl.search);

export default router;
