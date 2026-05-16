import { prisma } from '../../lib/prisma';

export class UserService {
  async updateProfilePicture(userId: number, pictureUrl: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { profilePicture: pictureUrl },
    });
  }

  // ... existing methods ...
}
