import { PrismaClient } from '@prisma/client';
import { CreateDatasetDto, UpdateDatasetDto } from './dataset.dto';

const prisma = new PrismaClient();

export class DatasetService {
  async create(data: CreateDatasetDto, ownerId: number) {
    return prisma.dataset.create({
      data: {
        ...data,
        tags: data.tags ? data.tags : undefined,
        ownerId,
      },
    });
  }

  async findAll(ownerId?: number) {
    return prisma.dataset.findMany({
      where: ownerId ? { ownerId } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, ownerId?: number) {
    return prisma.dataset.findFirst({
      where: {
        id,
        ...(ownerId ? { ownerId } : {}),
      },
    });
  }

  async update(id: number, data: UpdateDatasetDto, ownerId: number) {
    return prisma.dataset.updateMany({
      where: { id, ownerId },
      data: {
        ...data,
        tags: data.tags ? data.tags : undefined,
      },
    });
  }

  async remove(id: number, ownerId: number) {
    return prisma.dataset.deleteMany({
      where: { id, ownerId },
    });
  }
}
