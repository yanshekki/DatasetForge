import * as Minio from 'minio';

// Config from env
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
    await minioClient.makeBucket(BUCKET, 'us-east-1');
    console.log(`Bucket ${BUCKET} created`);
  }
}

export class UploadService {
  async getPresignedUrl(datasetId: number, version: string, fileName: string) {
    await ensureBucket();
    const objectName = `datasets/${datasetId}/versions/${version}/${fileName}`;
    try {
      const url = await minioClient.presignedPutObject(BUCKET, objectName, 60 * 60);
      return { url, objectName, method: 'PUT' };
    } catch (err) {
      console.error('MinIO presigned URL error:', err);
      throw new Error('Failed to generate upload URL');
    }
  }

  async notifyUploadComplete(datasetId: number, version: string, objectName: string, size: number) {
    console.log(`Upload complete: ${objectName}, size: ${size} bytes`);
    // TODO: Update DatasetVersion with filePath + size
    return { success: true, objectName, size };
  }
}
