import { Request, Response } from 'express';
import { UploadService } from './upload.service';

const uploadService = new UploadService();

export class UploadController {
  static async getPresignedUrl(req: Request, res: Response) {
    const { datasetId, version, fileName } = req.body;
    const result = await uploadService.getPresignedUrl(datasetId, version, fileName);
    res.json({ success: true, data: result });
  }

  static async completeUpload(req: Request, res: Response) {
    const { datasetId, version, objectName, size } = req.body;
    const result = await uploadService.notifyUploadComplete(datasetId, version, objectName, size);
    res.json({ success: true, data: result });
  }
}
