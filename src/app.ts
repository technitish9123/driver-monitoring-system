import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import eventRoutes from './routes/eventRoutes';
import alertRoutes from './routes/alertRoutes';
import { runRuleEngine } from './services/RuleEngineService';

const app = express();

// Middleware
app.use(bodyParser.json());

// Mount routes
app.use('/', eventRoutes);
app.use('/', alertRoutes);

//! Run the rule engine periodically
const windowEndTime = new Date(Date.now());
console.log(windowEndTime);

setInterval(runRuleEngine, 6000); //Interval for the Rule Engine

//! -------------------------
//! Error handling middleware
//! -------------------------

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

export default app;
