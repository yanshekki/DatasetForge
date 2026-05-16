import { Request, Response } from 'express';
import { DatasetService } from './dataset.service';

const datasetService = new DatasetService();

export const addTag = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { tagName } = req.body;
    const dataset = await datasetService.addTagToDataset(Number(id), tagName);
    res.json({ success: true, data: dataset });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to add tag' });
  }
};

export const removeTag = async (req: Request, res: Response) => {
  try {
    const { id, tagId } = req.params;
    const dataset = await datasetService.removeTagFromDataset(Number(id), Number(tagId));
    res.json({ success: true, data: dataset });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to remove tag' });
  }
};

// ... existing methods ...
