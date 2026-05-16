import { prisma } from '../../lib/prisma';
import { sendNotification } from '../../utils/notification.helper';

export class DatasetVersionService {
  async createVersion(datasetId: number, userId: number, fileName: string) {
    const version = await prisma.datasetVersion.create({
      data: {
        datasetId,
        userId,
        fileName,
        version: `v${Date.now()}`,
      },
    });

    // Send notification to dataset owner
    const dataset = await prisma.dataset.findUnique({
      where: { id: datasetId },
      include: { user: true },
    });

    if (dataset?.user) {
      await sendNotification(
        dataset.userId,
        'NEW_VERSION_UPLOADED',
        'New Version Uploaded',
        `A new version has been uploaded to your dataset: ${fileName}`,
        dataset.user.email
      );
    }

    return version;
  }
}
