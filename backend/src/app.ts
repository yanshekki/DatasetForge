import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pino from 'pino';
import dotenv from 'dotenv';
import authRoutes from './modules/auth/auth.route';
import datasetRoutes from './modules/dataset/dataset.route';

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
