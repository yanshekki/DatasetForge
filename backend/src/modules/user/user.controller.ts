import { Request, Response } from 'express';
import { UserService } from './user.service';

const userService = new UserService();

export const updateProfilePicture = async (req: any, res: Response) => {
  try {
    const { pictureUrl } = req.body;
    const user = await userService.updateProfilePicture(req.user.id, pictureUrl);
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update profile picture' });
  }
};

// ... existing methods ...
