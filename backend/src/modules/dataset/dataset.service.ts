import { prisma } from '../../lib/prisma';
import { sendNotification } from '../../utils/notification.helper';

export class DatasetService {
  // ... existing methods ...

  async shareDataset(datasetId: number, sharedByUserId: number, targetUserId: number) {
    // Existing share logic...

    // Send notification to target user
    await sendNotification(
      targetUserId,
      'DATASET_SHARED',
      'Dataset Shared With You',
      `A dataset has been shared with you. Dataset ID: ${datasetId}`
    );

    return { success: true };
  }
}
