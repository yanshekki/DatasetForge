import { Request, Response } from 'express';
import { TeamService } from './team.service';
import { createTeamDto } from './team.dto';
import { addMemberDto } from './team-member.dto';
import { validateRequest } from '../../middlewares/validate.middleware';

const teamService = new TeamService();

export class TeamController {
  static async create(req: Request, res: Response) {
    const data = validateRequest(createTeamDto, req.body);
    const ownerId = (req as any).user?.id || 1;
    const result = await teamService.create(data, ownerId);
    res.status(201).json({ success: true, data: result });
  }

  static async findByUser(req: Request, res: Response) {
    const userId = (req as any).user?.id || 1;
    const result = await teamService.findByUser(userId);
    res.json({ success: true, data: result });
  }

  static async addMember(req: Request, res: Response) {
    const teamId = parseInt(req.params.teamId);
    const data = validateRequest(addMemberDto, req.body);
    const requesterId = (req as any).user?.id || 1;
    const result = await teamService.addMember(teamId, data, requesterId);
    res.status(201).json({ success: true, data: result });
  }

  static async removeMember(req: Request, res: Response) {
    const teamId = parseInt(req.params.teamId);
    const userId = parseInt(req.params.userId);
    const requesterId = (req as any).user?.id || 1;
    await teamService.removeMember(teamId, userId, requesterId);
    res.json({ success: true, message: 'Member removed' });
  }
}
