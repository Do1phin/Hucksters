import express from 'express';
import authRoutes from './auth.routes.js';
import sellersRoutes from './seller.routes.js';
import albumsRoutes from './album.routes.js';
import photosRoutes from './photo.routes.js';
import groupsRoutes from './group.routes.js';
import commentsRoutes from './comment.routes.js';
import searchRoutes from './search.routes.js';
import infoCountersRoutes from './infoCounters.routes.js';

const router = express.Router();

router.use('/', authRoutes);
router.use('/', sellersRoutes);
router.use('/', albumsRoutes);
router.use('/', photosRoutes);
router.use('/', groupsRoutes);
router.use('/', commentsRoutes);
router.use('/', searchRoutes);
router.use('/', infoCountersRoutes);

export default router;
