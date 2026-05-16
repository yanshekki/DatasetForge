import { NotificationService } from '../modules/notification/notification.service';

const notificationService = new NotificationService();

export const sendNotification = async (
  userId: number,
  type: string,
  title: string,
  message: string
) => {
  try {
    await notificationService.createNotification(userId, type, title, message);
    // TODO: Add email sending here
    console.log(`Notification sent to user ${userId}: ${title}`);
  } catch (error) {
    console.error('Failed to send notification:', error);
  }
};
