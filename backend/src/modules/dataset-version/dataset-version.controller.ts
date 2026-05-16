import { Request, Response } from 'express';
import { DatasetVersionService } from './dataset-version.service';

const datasetVersionService = new DatasetVersionService();

export const incrementVersionDownload = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const version = await datasetVersionService.incrementVersionDownloadCount(Number(id));
    res.json({ success: true, data: version });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to increment version download count' });
  }
};

// ... existing methods ...
