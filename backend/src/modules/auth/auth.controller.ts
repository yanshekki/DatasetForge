import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { registerDto, loginDto } from './auth.dto';
import { validateRequest } from '../../middlewares/validate.middleware';

const authService = new AuthService();

export class AuthController {
  static async register(req: Request, res: Response) {
    const data = validateRequest(registerDto, req.body);
    const result = await authService.register(data);
    res.status(201).json({ success: true, data: result });
  }

  static async login(req: Request, res: Response) {
    const data = validateRequest(loginDto, req.body);
    const result = await authService.login(data);
    res.status(200).json({ success: true, data: result });
  }
}
