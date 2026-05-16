import { prisma } from '../../lib/prisma';

export class DatasetService {
  async incrementDownloadCount(datasetId: number) {
    return prisma.dataset.update({
      where: { id: datasetId },
      data: { downloadCount: { increment: 1 } }
    });
  }

  // ... existing methods ...
}
