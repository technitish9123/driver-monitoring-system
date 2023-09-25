import express from 'express';
import { getAlertById } from '../controllers/AlertController';

const router = express.Router();

// GET /alert/:alert_id

router.get('/alert/:alert_id', getAlertById);

export default router;
