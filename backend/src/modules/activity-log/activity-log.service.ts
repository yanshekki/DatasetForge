import { prisma } from '../../lib/prisma';
import { stringify } from 'csv-stringify/sync';

export class ActivityLogService {
  async exportLogs(format: string = 'csv') {
    const logs = await prisma.activityLog.findMany({
      include: {
        user: { select: { name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: 10000
    });

    if (format === 'csv') {
      const records = logs.map(log => ({
        id: log.id,
        user: log.user?.name || log.user?.email,
        type: log.type,
        targetId: log.targetId,
        createdAt: log.createdAt.toISOString()
      }));
      return stringify(records, { header: true });
    } else {
      return JSON.stringify(logs, null, 2);
    }
  }

  // ... existing methods ...
}
