import { prisma } from '../../lib/prisma';

export class DatasetService {
  async addTagToDataset(datasetId: number, tagName: string) {
    const tag = await prisma.tag.upsert({
      where: { name: tagName },
      update: {},
      create: { name: tagName },
    });

    return prisma.dataset.update({
      where: { id: datasetId },
      data: {
        tags: {
          connect: { id: tag.id }
        }
      },
      include: { tags: true }
    });
  }

  async removeTagFromDataset(datasetId: number, tagId: number) {
    return prisma.dataset.update({
      where: { id: datasetId },
      data: {
        tags: {
          disconnect: { id: tagId }
        }
      },
      include: { tags: true }
    });
  }

  // ... existing methods ...
}
