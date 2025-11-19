import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
  getProfile,
  updateProfile,
  updatePassword
} from '../controllers/profileController.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getProfile);
router.put('/', updateProfile);
router.put('/password', updatePassword);

export default router;
