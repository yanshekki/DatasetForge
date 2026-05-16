import { prisma } from '../../lib/prisma';

export class DatasetVersionService {
  async compareVersions(versionId1: number, versionId2: number) {
    const [v1, v2] = await Promise.all([
      prisma.datasetVersion.findUnique({ where: { id: versionId1 } }),
      prisma.datasetVersion.findUnique({ where: { id: versionId2 } }),
    ]);

    if (!v1 || !v2) {
      throw new Error('One or both versions not found');
    }

    const diff = {
      version1: {
        id: v1.id,
        version: v1.version,
        fileName: v1.fileName,
        fileSize: v1.fileSize,
        description: v1.description,
        createdAt: v1.createdAt,
      },
      version2: {
        id: v2.id,
        version: v2.version,
        fileName: v2.fileName,
        fileSize: v2.fileSize,
        description: v2.description,
        createdAt: v2.createdAt,
      },
      differences: {
        fileNameChanged: v1.fileName !== v2.fileName,
        fileSizeChanged: v1.fileSize !== v2.fileSize,
        descriptionChanged: v1.description !== v2.description,
        sizeDifference: (v2.fileSize || 0) - (v1.fileSize || 0),
      }
    };

    return diff;
  }

  // ... existing methods ...
}
