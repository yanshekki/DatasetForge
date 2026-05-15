import { PrismaClient } from '@prisma/client';
import { CreateVersionDto } from './dataset-version.dto';

const prisma = new PrismaClient();

export class DatasetVersionService {
  async create(datasetId: number, data: CreateVersionDto) {
    return prisma.datasetVersion.create({
      data: {
        datasetId,
        version: data.version,
        description: data.description,
        metadata: data.metadata || {},
      },
    });
  }

  async findByDataset(datasetId: number) {
    return prisma.datasetVersion.findMany({
      where: { datasetId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
