import { Router } from 'express';
import { ActivityLogService } from './activity-log.service';

const router = Router();
const activityLogService = new ActivityLogService();

// ... existing routes ...

// Export Activity Logs
router.get('/export', async (req, res) => {
  try {
    const { format = 'csv' } = req.query;
    const result = await activityLogService.exportLogs(format as string);
    
    if (format === 'csv') {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=activity-logs.csv');
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', 'attachment; filename=activity-logs.json');
    }
    
    res.send(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
