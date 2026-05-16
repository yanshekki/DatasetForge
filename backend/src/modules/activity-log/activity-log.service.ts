import { prisma } from '../../lib/prisma';

export class ActivityLogService {
  async getActivityHeatmap(userId: number, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const logs = await prisma.activityLog.groupBy({
      by: ['createdAt'],
      where: {
        userId,
        createdAt: { gte: startDate }
      },
      _count: { id: true }
    });

    // Convert to daily counts
    const heatmap: Record<string, number> = {};
    logs.forEach(log => {
      const date = log.createdAt.toISOString().split('T')[0];
      heatmap[date] = (heatmap[date] || 0) + log._count.id;
    });

    return heatmap;
  }

  // ... existing methods ...
}
