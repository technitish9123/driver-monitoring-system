
import { Request, Response } from 'express';
import Event from '../models/Event';

//! -------------------------
//! Handle incoming events
//! -------------------------

export const createEvent = async (req: Request, res: Response) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

