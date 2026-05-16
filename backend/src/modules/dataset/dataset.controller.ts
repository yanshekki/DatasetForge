import { Request, Response } from 'express';
import { DatasetService } from './dataset.service';

const datasetService = new DatasetService();

export const exportDataset = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const zipBuffer = await datasetService.exportDatasetAsZip(Number(id));

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename=dataset-${id}.zip`);
    res.send(zipBuffer);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to export dataset' });
  }
};

// ... existing methods ...
