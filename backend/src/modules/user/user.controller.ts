import { Request, Response } from 'express';
import { UserService } from './user.service';

const userService = new UserService();

export const getPreferences = async (req: any, res: Response) => {
  try {
    const preferences = await userService.getUserPreferences(req.user.id);
    res.json({ success: true, data: preferences });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch preferences' });
  }
};

export const updatePreferences = async (req: any, res: Response) => {
  try {
    const preferences = await userService.updateUserPreferences(req.user.id, req.body);
    res.json({ success: true, data: preferences });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update preferences' });
  }
};
