import { prisma } from '../../lib/prisma';

export class DatasetService {
  async getDatasets(userId: number, query: any = {}) {
    const { search, startDate, endDate, sortBy = 'createdAt', sortOrder = 'desc' } = query;

    const where: any = {
      OR: [
        { userId },
        {
          permissions: {
            some: { userId }
          }
        }
      ]
    };

    if (search) {
      where.AND = [
        {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            {
              tags: {
                some: {
                  name: { contains: search, mode: 'insensitive' }
                }
              }
            }
          ]
        }
      ];
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    return prisma.dataset.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      include: {
        user: { select: { id: true, name: true, email: true } },
        tags: true,
        _count: { select: { versions: true } }
      }
    });
  }

  // ... existing methods ...
}
