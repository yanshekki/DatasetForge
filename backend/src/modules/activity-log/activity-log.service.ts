import { PrismaClient } from '@prisma/client';
import { CreateLogDto } from './activity-log.dto';

const prisma = new PrismaClient();

export class ActivityLogService {
  async log(userId: number, data: CreateLogDto) {
    return prisma.activityLog.create({
      data: {
        userId,
        action: data.action,
        entity: data.entity,
        entityId: data.entityId,
        metadata: data.metadata || {},
      },
    });
  }

  async findAll(userId?: number, limit = 50) {
    return prisma.activityLog.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
}
