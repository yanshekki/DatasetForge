import { Request, Response } from 'express';
import { UploadService } from './upload.service';

const uploadService = new UploadService();

export const getPresignedUrl = async (req: Request, res: Response) => {
  try {
    const { datasetId, version, fileName, operation } = req.body;
    const url = await uploadService.getPresignedUrl(datasetId, version, fileName, operation);
    res.json({ success: true, data: { url } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to generate presigned URL' });
  }
};

export const completeUpload = async (req: Request, res: Response) => {
  res.json({ success: true, message: 'Upload completed' });
};

export const deleteFile = async (req: Request, res: Response) => {
  try {
    const { datasetId, version, fileName } = req.body;
    const result = await uploadService.deleteFile(datasetId, version, fileName);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete file' });
  }
};

export const listFiles = async (req: Request, res: Response) => {
  try {
    const { datasetId, version } = req.query;
    const files = await uploadService.listFiles(Number(datasetId), version as string);
    res.json({ success: true, data: files });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to list files' });
  }
};
