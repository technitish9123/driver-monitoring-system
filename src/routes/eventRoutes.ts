import express from 'express';
import { createEvent } from '../controllers/EventController';

const router = express.Router();

router.post('/event', createEvent);

export default router;

