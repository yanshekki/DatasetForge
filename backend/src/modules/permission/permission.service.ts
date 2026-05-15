import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type PermissionLevel = 'READ' | 'WRITE' | 'ADMIN';

export class PermissionService {
  async canAccessDataset(userId: number, datasetId: number, requiredLevel: PermissionLevel = 'READ') {
    const dataset = await prisma.dataset.findUnique({ where: { id: datasetId } });
    if (!dataset) return false;
    if (dataset.ownerId === userId) return true;

    // Check direct permission
    const permission = await prisma.datasetPermission.findFirst({
      where: { datasetId, userId },
    });
    if (permission) {
      // Simple level check (expand later)
      return true;
    }

    // Check via team (simplified)
    // In real impl, check if user is in a team that has permission
    return false;
  }

  async shareDataset(datasetId: number, userId: number, level: PermissionLevel, grantedBy: number) {
    return prisma.datasetPermission.create({
      data: {
        datasetId,
        userId,
        level,
        grantedBy,
      },
    });
  }
}
