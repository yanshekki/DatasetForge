import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pino from 'pino';
import dotenv from 'dotenv';
import authRoutes from './modules/auth/auth.route';
import datasetRoutes from './modules/dataset/dataset.route';
import datasetVersionRoutes from './modules/dataset-version/dataset-version.route';
import uploadRoutes from './modules/upload/upload.route';
import activityLogRoutes from './modules/activity-log/activity-log.route';
import teamRoutes from './modules/team/team.route';

dotenv.config();

const app = express();
const logger = pino({
  transport: { target: 'pino-pretty' }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/datasets', datasetRoutes);
app.use('/api/datasets/:datasetId/versions', datasetVersionRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/activity-logs', activityLogRoutes);
app.use('/api/teams', teamRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'DatasetForge Backend is running',
    timestamp: new Date().toISOString(),
  });
});

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

export default app;
