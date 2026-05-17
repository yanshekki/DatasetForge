import { prisma } from '../../lib/prisma';

export class DatasetService {
  async advancedSearch(query: string, tags?: string, sort: string = 'relevance') {
    let whereClause: any = {};

    if (query) {
      whereClause.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ];
    }

    if (tags) {
      const tagList = tags.split(',').map(t => t.trim());
      whereClause.tags = {
        some: {
          name: { in: tagList }
        }
      };
    }

    let orderBy: any = { createdAt: 'desc' };

    if (sort === 'relevance' && query) {
      // Simple relevance: prioritize name matches
      orderBy = [
        { name: { sort: 'asc', nulls: 'last' } },
        { createdAt: 'desc' }
      ];
    } else if (sort === 'downloads') {
      orderBy = { downloadCount: 'desc' };
    }

    return prisma.dataset.findMany({
      where: whereClause,
      include: {
        tags: true,
        user: { select: { name: true } }
      },
      orderBy,
      take: 50
    });
  }

  // ... existing methods ...
}
