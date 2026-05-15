import { Request, Response } from 'express';
import { DatasetService } from './dataset.service';
import { createDatasetDto, updateDatasetDto } from './dataset.dto';
import { validateRequest } from '../../middlewares/validate.middleware';

const datasetService = new DatasetService();

export class DatasetController {
  static async create(req: Request, res: Response) {
    const data = validateRequest(createDatasetDto, req.body);
    // TODO: get ownerId from auth middleware later
    const ownerId = (req as any).user?.id || 1; // temporary
    const result = await datasetService.create(data, ownerId);
    res.status(201).json({ success: true, data: result });
  }

  static async findAll(req: Request, res: Response) {
    const ownerId = (req as any).user?.id; // optional filter
    const result = await datasetService.findAll(ownerId);
    res.json({ success: true, data: result });
  }

  static async findOne(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const ownerId = (req as any).user?.id;
    const result = await datasetService.findOne(id, ownerId);
    if (!result) return res.status(404).json({ success: false, message: 'Dataset not found' });
    res.json({ success: true, data: result });
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const data = validateRequest(updateDatasetDto, req.body);
    const ownerId = (req as any).user?.id || 1;
    const result = await datasetService.update(id, data, ownerId);
    res.json({ success: true, data: result });
  }

  static async remove(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const ownerId = (req as any).user?.id || 1;
    await datasetService.remove(id, ownerId);
    res.json({ success: true, message: 'Deleted' });
  }
}
