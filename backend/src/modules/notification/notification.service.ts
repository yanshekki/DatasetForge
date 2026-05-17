import { prisma } from '../../lib/prisma';
import { sendEmail, getCommentEmailTemplate, getMentionEmailTemplate } from '../../lib/email';

export class NotificationService {
  async createNotification(userId: number, type: string, message: string, metadata?: any) {
    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        message,
        metadata: metadata || {},
      },
    });

    // Send email for important notifications
    if (['COMMENT', 'MENTION', 'SHARE'].includes(type)) {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (user?.email) {
        let subject = 'DatasetForge Notification';
        let html = `<p>${message}</p>`;

        if (type === 'COMMENT' && metadata) {
          subject = `New comment on ${metadata.datasetName}`;
          html = getCommentEmailTemplate(
            metadata.datasetName,
            metadata.commenterName,
            metadata.content,
            metadata.datasetUrl
          );
        }

        if (type === 'MENTION' && metadata) {
          subject = `You were mentioned in ${metadata.datasetName}`;
          html = getMentionEmailTemplate(
            metadata.datasetName,
            metadata.mentionerName,
            metadata.content,
            metadata.datasetUrl
          );
        }

        await sendEmail(user.email, subject, html);
      }
    }

    return notification;
  }
}
