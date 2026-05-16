import { Request, Response } from 'express';
import { DatasetVersionService } from './dataset-version.service';

const datasetVersionService = new DatasetVersionService();

export const compareVersions = async (req: Request, res: Response) => {
  try {
    const { versionId1, versionId2 } = req.query;
    const diff = await datasetVersionService.compareVersions(
      Number(versionId1),
      Number(versionId2)
    );
    res.json({ success: true, data: diff });
  } catch (error) {
    res.status(400).json({ success: false, message: error instanceof Error ? error.message : 'Comparison failed' });
  }
};

// ... existing methods ...
