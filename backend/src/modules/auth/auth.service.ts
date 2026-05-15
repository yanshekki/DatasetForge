import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RegisterDto, LoginDto } from './auth.dto';

const prisma = new PrismaClient();

export class AuthService {
  async register(data: RegisterDto) {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) throw new Error('User with this email already exists');

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
      },
    });

    return this.generateTokens(user);
  }

  async login(data: LoginDto) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) throw new Error('Invalid email or password');

    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) throw new Error('Invalid email or password');

    return this.generateTokens(user);
  }

  private generateTokens(user: any) {
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }
    );

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, name: user.name },
    };
  }
}
