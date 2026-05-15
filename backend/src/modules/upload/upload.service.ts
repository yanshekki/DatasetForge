import * as Minio from 'minio';

// TODO: Move to env config
const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
});

const BUCKET = process.env.MINIO_BUCKET || 'datasetforge';

export class UploadService {
  async getPresignedUrl(datasetId: number, version: string, fileName: string) {
    const objectName = `datasets/${datasetId}/versions/${version}/${fileName}`;
    // Generate presigned URL valid for 1 hour
    const url = await minioClient.presignedPutObject(BUCKET, objectName, 60 * 60);
    return {
      url,
      objectName,
      method: 'PUT',
    };
  }

  async notifyUploadComplete(datasetId: number, version: string, objectName: string, size: number) {
    // TODO: Update DatasetVersion with filePath, size, etc.
    console.log(`Upload complete for ${objectName}, size: ${size}`);
    return { success: true };
  }
}
