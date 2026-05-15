import { Request, Response } from 'express';
import { DatasetVersionService } from './dataset-version.service';
import { createVersionDto } from './dataset-version.dto';
import { validateRequest } from '../../middlewares/validate.middleware';

const versionService = new DatasetVersionService();

export class DatasetVersionController {
  static async create(req: Request, res: Response) {
    const datasetId = parseInt(req.params.datasetId);
    const data = validateRequest(createVersionDto, req.body);
    const result = await versionService.create(datasetId, data);
    res.status(201).json({ success: true, data: result });
  }

  static async findByDataset(req: Request, res: Response) {
    const datasetId = parseInt(req.params.datasetId);
    const result = await versionService.findByDataset(datasetId);
    res.json({ success: true, data: result });
  }
}
