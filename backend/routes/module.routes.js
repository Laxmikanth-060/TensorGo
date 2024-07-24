import express from 'express';
import {
  getAllModules,
  getModuleById,
  getVideosByModuleId,
  createVideoForModule,
} from '../controllers/module.controller.js';

const router = express.Router();

router.get('/', getAllModules);
router.get('/:moduleId', getModuleById);
router.get('/:moduleId/videos', getVideosByModuleId);
router.post('/:moduleId/videos', createVideoForModule);

export default router;
