import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UpdateProfileDto, ChangePasswordDto } from './auth.dto';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  try {
    const data = RegisterDto.parse(req.body);
    const user = await authService.register(data);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error instanceof Error ? error.message : 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = LoginDto.parse(req.body);
    const user = await authService.login(data.email, data.password);
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(401).json({ success: false, message: error instanceof Error ? error.message : 'Login failed' });
  }
};

export const updateProfile = async (req: any, res: Response) => {
  try {
    const data = UpdateProfileDto.parse(req.body);
    const user = await authService.updateProfile(req.user.id, data);
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error instanceof Error ? error.message : 'Update failed' });
  }
};

export const changePassword = async (req: any, res: Response) => {
  try {
    const data = ChangePasswordDto.parse(req.body);
    await authService.changePassword(req.user.id, data.currentPassword, data.newPassword);
    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error instanceof Error ? error.message : 'Password change failed' });
  }
};
