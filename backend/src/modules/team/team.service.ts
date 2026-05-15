import { PrismaClient } from '@prisma/client';
import { CreateTeamDto } from './team.dto';
import { AddMemberDto } from './team-member.dto';

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

  async addMember(teamId: number, data: AddMemberDto, requesterId: number) {
    // Simple check: only owner can add for now
    const team = await prisma.team.findUnique({ where: { id: teamId } });
    if (!team || team.ownerId !== requesterId) throw new Error('Not authorized');

    return prisma.teamMember.create({
      data: {
        teamId,
        userId: data.userId,
        role: data.role,
      },
    });
  }

  async removeMember(teamId: number, userId: number, requesterId: number) {
    const team = await prisma.team.findUnique({ where: { id: teamId } });
    if (!team || team.ownerId !== requesterId) throw new Error('Not authorized');

    return prisma.teamMember.deleteMany({
      where: { teamId, userId },
    });
  }
}
