import { NotificationService } from '../modules/notification/notification.service';
import { sendEmail } from './email.service';

const notificationService = new NotificationService();

export const sendNotification = async (
  userId: number,
  type: string,
  title: string,
  message: string,
  userEmail?: string
) => {
  try {
    await notificationService.createNotification(userId, type, title, message);

    // Send email if email is provided
    if (userEmail) {
      const html = `
        <h2>${title}</h2>
        <p>${message}</p>
        <p>DatasetForge - AI Training Dataset Platform</p>
      `;
      await sendEmail(userEmail, title, html);
    }

    console.log(`Notification sent to user ${userId}: ${title}`);
  } catch (error) {
    console.error('Failed to send notification:', error);
  }
};
