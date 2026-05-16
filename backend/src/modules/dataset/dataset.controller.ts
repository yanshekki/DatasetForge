import { Request, Response } from 'express';
import { DatasetService } from './dataset.service';

const datasetService = new DatasetService();

export const getAllDatasets = async (req: any, res: Response) => {
  try {
    const datasets = await datasetService.getDatasets(req.user.id, req.query);
    res.json({ success: true, data: datasets });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch datasets' });
  }
};

// ... existing methods ...
