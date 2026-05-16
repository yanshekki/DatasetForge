import { Request, Response } from 'express';
import { DatasetService } from './dataset.service';

const datasetService = new DatasetService();

export const incrementDownload = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dataset = await datasetService.incrementDownloadCount(Number(id));
    res.json({ success: true, data: dataset });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to increment download count' });
  }
};

// ... existing methods ...
