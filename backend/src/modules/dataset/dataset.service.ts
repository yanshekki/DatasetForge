import { prisma } from '../../lib/prisma';
import { minioClient } from '../../lib/minio';

export class DatasetService {
  async deleteVersion(datasetId: number, versionId: number) {
    const version = await prisma.datasetVersion.findUnique({
      where: { id: versionId },
      include: { dataset: true }
    });

    if (!version) {
      throw new Error('Version not found');
    }

    // Delete file from MinIO
    try {
      await minioClient.removeObject(
        process.env.MINIO_BUCKET || 'datasets',
        version.fileName
      );
      console.log(`Deleted file from MinIO: ${version.fileName}`);
    } catch (error) {
      console.error('Failed to delete file from MinIO:', error);
      // Continue with database deletion even if MinIO deletion fails
    }

    // Delete from database
    await prisma.datasetVersion.delete({
      where: { id: versionId }
    });

    return { success: true };
  }

  // ... existing methods ...
}
