import * as Minio from 'minio';

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
});

const BUCKET = process.env.MINIO_BUCKET || 'datasetforge';

async function ensureBucket() {
  const exists = await minioClient.bucketExists(BUCKET);
  if (!exists) {
    await minioClient.makeBucket(BUCKET);
  }
}

export class UploadService {
  async getPresignedUrl(datasetId: number, version: string, fileName: string, operation: 'upload' | 'download' = 'upload') {
    await ensureBucket();
    const objectName = `datasets/${datasetId}/versions/${version}/${fileName}`;
    try {
      if (operation === 'upload') {
        const url = await minioClient.presignedPutObject(BUCKET, objectName, 60 * 60);
        return { url, objectName, method: 'PUT' };
      } else {
        const url = await minioClient.presignedGetObject(BUCKET, objectName, 60 * 60);
        return { url, objectName, method: 'GET' };
      }
    } catch (err) {
      console.error('MinIO error:', err);
      throw new Error('Failed to generate presigned URL');
    }
  }

  async notifyUploadComplete(datasetId: number, version: string, objectName: string, size: number) {
    console.log(`[Upload] Complete: ${objectName} (${size} bytes)`);
    return { success: true };
  }
}
