import { PrismaClient } from '@prisma/client';
import { CreateTeamDto } from './team.dto';

const prisma = new PrismaClient();

export class TeamService {
  async create(data: CreateTeamDto, ownerId: number) {
    return prisma.team.create({
      data: {
        name: data.name,
        description: data.description,
        ownerId,
      },
    });
  }

  async findByUser(userId: number) {
    return prisma.team.findMany({
      where: {
        OR: [
          { ownerId: userId },
          { members: { some: { userId } } },
        ],
      },
    });
  }
}
