import { prisma } from '../../lib/prisma';
import { Parser } from 'json2csv';

export class DatasetService {
  async exportDatasetAsCSV(datasetId: number): Promise<string> {
    const dataset = await prisma.dataset.findUnique({
      where: { id: datasetId },
      include: {
        versions: true,
        tags: true,
        comments: { include: { user: { select: { name: true } } } }
      }
    });

    if (!dataset) throw new Error('Dataset not found');

    const data = [{
      id: dataset.id,
      name: dataset.name,
      description: dataset.description,
      downloadCount: dataset.downloadCount,
      createdAt: dataset.createdAt,
      versions: JSON.stringify(dataset.versions),
      tags: JSON.stringify(dataset.tags),
      comments: JSON.stringify(dataset.comments)
    }];

    const parser = new Parser();
    return parser.parse(data);
  }

  async exportDatasetAsJSON(datasetId: number): Promise<any> {
    const dataset = await prisma.dataset.findUnique({
      where: { id: datasetId },
      include: {
        versions: true,
        tags: true,
        comments: { include: { user: { select: { name: true } } } }
      }
    });

    if (!dataset) throw new Error('Dataset not found');
    return dataset;
  }

  // ... existing methods ...
}
