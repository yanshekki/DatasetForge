import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type PermissionLevel = 'READ' | 'WRITE' | 'ADMIN';

export class PermissionService {
  async canAccessDataset(userId: number, datasetId: number, requiredLevel: PermissionLevel = 'READ') {
    const dataset = await prisma.dataset.findUnique({ where: { id: datasetId } });
    if (!dataset) return false;
    if (dataset.ownerId === userId) return true;

    // Check direct user permission
    const directPermission = await prisma.datasetPermission.findFirst({
      where: { datasetId, userId },
    });
    if (directPermission) return true;

    // Check via team membership (simplified)
    const teamPermission = await prisma.datasetPermission.findFirst({
      where: {
        datasetId,
        team: {
          members: { some: { userId } }
        }
      },
    });
    return !!teamPermission;
  }

  async shareDatasetWithUser(datasetId: number, targetUserId: number, level: PermissionLevel, grantedBy: number) {
    return prisma.datasetPermission.create({
      data: { datasetId, userId: targetUserId, level, grantedBy },
    });
  }

  async shareDatasetWithTeam(datasetId: number, teamId: number, level: PermissionLevel, grantedBy: number) {
    return prisma.datasetPermission.create({
      data: { datasetId, teamId, level, grantedBy },
    });
  }
}
