import express from 'express';
import authRoutes from './auth.routes.js';
import membersRoutes from './member.routes.js';
import albumsRoutes from './album.routes.js';
import photosRoutes from './photo.routes.js';
import groupsRoutes from './group.routes.js';
import commentsRoutes from './comment.routes.js';
import searchRoutes from './search.routes.js';
import countersRoutes from './counters.routes.js';

const router = express.Router();

router.use('/', authRoutes);
router.use('/', membersRoutes);
router.use('/', albumsRoutes);
router.use('/', photosRoutes);
router.use('/', groupsRoutes);
router.use('/', commentsRoutes);
router.use('/', searchRoutes);
router.use('/', countersRoutes);

export default router;
