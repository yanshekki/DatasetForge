import { prisma } from '../../lib/prisma';

export class UserService {
  async updateUserPreferences(userId: number, preferences: any) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        preferences: preferences,
      },
    });
  }

  async getUserPreferences(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { preferences: true }
    });
    return user?.preferences || {};
  }
}
