import { Request, Response } from 'express';
import { DatasetService } from './dataset.service';

const datasetService = new DatasetService();

export const exportDatasetCSV = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const csv = await datasetService.exportDatasetAsCSV(Number(id));
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=dataset-${id}.csv`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to export dataset as CSV' });
  }
};

export const exportDatasetJSON = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const json = await datasetService.exportDatasetAsJSON(Number(id));
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=dataset-${id}.json`);
    res.json(json);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to export dataset as JSON' });
  }
};

// ... existing methods ...
