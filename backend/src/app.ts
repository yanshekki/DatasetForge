import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pino from 'pino';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

import authRoutes from './modules/auth/auth.route';
import datasetRoutes from './modules/dataset/dataset.route';
import datasetVersionRoutes from './modules/dataset-version/dataset-version.route';
import uploadRoutes from './modules/upload/upload.route';
import activityLogRoutes from './modules/activity-log/activity-log.route';
import teamRoutes from './modules/team/team.route';
import notificationRoutes from './modules/notification/notification.route';
import shareLinkRoutes from './modules/share-link/share-link.route';
import { authenticateToken } from './middlewares/auth.middleware';
import { errorHandler } from './middlewares/error.middleware';
import { apiLimiter } from './middlewares/rate-limit.middleware';
import { requestIdMiddleware } from './middlewares/request-id.middleware';
import { requireDatasetAccess } from './middlewares/permission.middleware';

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
app.use(requestIdMiddleware);
app.use('/api/', apiLimiter);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Public routes
app.use('/api/auth', authRoutes);
app.use('/api/shared', shareLinkRoutes);

// Protected routes
app.use('/api/datasets', authenticateToken, datasetRoutes);
app.use('/api/datasets/:datasetId', authenticateToken, requireDatasetAccess);
app.use('/api/datasets/:datasetId/versions', authenticateToken, requireDatasetAccess, datasetVersionRoutes);
app.use('/api/upload', authenticateToken, requireDatasetAccess, uploadRoutes);
app.use('/api/activity-logs', authenticateToken, activityLogRoutes);
app.use('/api/teams', authenticateToken, teamRoutes);
app.use('/api/notifications', authenticateToken, notificationRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'DatasetForge Backend is running',
    timestamp: new Date().toISOString(),
  });
});

app.use((req, res, next) => {
  logger.info(`[${req.requestId}] ${req.method} ${req.url}`);
  next();
});

// Global error handler
app.use(errorHandler);

export default app;
