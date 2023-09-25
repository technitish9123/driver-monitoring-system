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

setInterval(runRuleEngine, 600);

//! -------------------------
//! Error handling middleware
//! -------------------------

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});




export default app;
