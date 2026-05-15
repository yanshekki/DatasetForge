import { Client } from 'minio';
import dotenv from 'dotenv';

dotenv.config();

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || '',
  secretKey: process.env.MINIO_SECRET_KEY || '',
});

const BUCKET_NAME = process.env.MINIO_BUCKET || 'datasetforge';

export class UploadService {
  async getPresignedUrl(datasetId: number, version: string, fileName: string, operation: 'upload' | 'download' = 'upload') {
    const objectName = `datasets/${datasetId}/versions/${version}/${fileName}`;

    if (operation === 'download') {
      return minioClient.presignedGetObject(BUCKET_NAME, objectName, 60 * 60); // 1 hour
    } else {
      return minioClient.presignedPutObject(BUCKET_NAME, objectName, 60 * 60); // 1 hour
    }
  }

  async deleteFile(datasetId: number, version: string, fileName: string) {
    const objectName = `datasets/${datasetId}/versions/${version}/${fileName}`;
    await minioClient.removeObject(BUCKET_NAME, objectName);
    return { success: true, message: 'File deleted from storage' };
  }

  async listFiles(datasetId: number, version?: string) {
    const prefix = version 
      ? `datasets/${datasetId}/versions/${version}/` 
      : `datasets/${datasetId}/`;

    const stream = minioClient.listObjectsV2(BUCKET_NAME, prefix, true);
    const files: any[] = [];

    return new Promise((resolve, reject) => {
      stream.on('data', (obj) => files.push(obj));
      stream.on('error', reject);
      stream.on('end', () => resolve(files));
    });
  }
}
