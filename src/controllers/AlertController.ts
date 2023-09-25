
import { Request, Response } from 'express';
import Alert from '../models/Alert';

//! -------------------------
//! Get alerts by ID
//! -------------------------

export const getAlertById = async (req: Request, res: Response) => {
    try {
        const alert = await Alert.findById(req.params.alert_id);
        if (!alert) {
            res.status(404).json({ error: 'Alert not found' });
            return;
        }
        res.status(200).json(alert);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
