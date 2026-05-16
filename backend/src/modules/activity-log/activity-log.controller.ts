import { Request, Response } from 'express';
import { ActivityLogService } from './activity-log.service';

const activityLogService = new ActivityLogService();

export const getActivityHeatmap = async (req: any, res: Response) => {
  try {
    const heatmap = await activityLogService.getActivityHeatmap(req.user.id);
    res.json({ success: true, data: heatmap });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch activity heatmap' });
  }
};

// ... existing methods ...
