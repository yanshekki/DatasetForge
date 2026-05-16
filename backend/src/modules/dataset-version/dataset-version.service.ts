import { prisma } from '../../lib/prisma';

export class DatasetVersionService {
  async incrementVersionDownloadCount(versionId: number) {
    return prisma.datasetVersion.update({
      where: { id: versionId },
      data: { downloadCount: { increment: 1 } }
    });
  }

  // ... existing methods ...
}
