import { prisma } from '../../lib/prisma';

export class NotificationService {
  async createNotification(userId: number, type: string, title: string, message: string) {
    return prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
      },
    });
  }

  async getUserNotifications(userId: number, limit: number = 20) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async markAsRead(notificationId: number) {
    return prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  }

  async markAllAsRead(userId: number) {
    return prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
  }
}
