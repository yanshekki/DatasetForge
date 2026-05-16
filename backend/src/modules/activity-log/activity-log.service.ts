import { prisma } from '../../lib/prisma';
import { stringify } from 'csv-stringify/sync';

export class ActivityLogService {
  async getActivityLogs(userId: number, query: any = {}) {
    const { startDate, endDate, type, limit = 50, format = 'json' } = query;

    const where: any = { userId };

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    if (type) {
      where.type = type;
    }

    const logs = await prisma.activityLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: Number(limit),
    });

    if (format === 'csv') {
      return stringify(logs, { header: true });
    }

    return logs;
  }

  // ... existing methods ...
}
