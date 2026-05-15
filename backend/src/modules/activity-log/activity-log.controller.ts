import { Request, Response } from 'express';
import { ActivityLogService } from './activity-log.service';

const logService = new ActivityLogService();

export class ActivityLogController {
  static async findAll(req: Request, res: Response) {
    const userId = (req as any).user?.id;
    const result = await logService.findAll(userId);
    res.json({ success: true, data: result });
  }
}
