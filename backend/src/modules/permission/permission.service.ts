import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PermissionService {
  async canAccessDataset(userId: number, datasetId: number, requiredLevel: string = 'read') {
    // Basic check: owner or has permission
    const dataset = await prisma.dataset.findUnique({ where: { id: datasetId } });
    if (!dataset) return false;
    if (dataset.ownerId === userId) return true;

    // Check permission table (to be expanded)
    const permission = await prisma.datasetPermission.findFirst({
      where: { datasetId, userId },
    });
    return !!permission; // expand with level check later
  }
}
