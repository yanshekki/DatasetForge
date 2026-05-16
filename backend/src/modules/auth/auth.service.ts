import { prisma } from '../../lib/prisma';
import bcrypt from 'bcryptjs';

export class AuthService {
  async register(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
      },
    });
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid password');

    return user;
  }

  async updateProfile(userId: number, data: any) {
    return prisma.user.update({
      where: { id: userId },
      data: { name: data.name },
    });
  }

  async changePassword(userId: number, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) throw new Error('Current password is incorrect');

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    return prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });
  }
}
