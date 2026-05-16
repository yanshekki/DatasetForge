import { Request, Response } from 'express';
import { ActivityLogService } from './activity-log.service';

const activityLogService = new ActivityLogService();

export const getActivityLogs = async (req: any, res: Response) => {
  try {
    const logs = await activityLogService.getActivityLogs(req.user.id, req.query);
    if (req.query.format === 'csv') {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=activity-logs.csv');
    }
    res.send(logs);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch activity logs' });
  }
};

// ... existing methods ...
