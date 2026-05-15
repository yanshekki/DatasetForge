import { Request, Response } from 'express';
import { TeamService } from './team.service';
import { createTeamDto } from './team.dto';
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
}
