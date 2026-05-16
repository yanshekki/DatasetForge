import { z } from 'zod';

export const RegisterDto = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export const LoginDto = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const UpdateProfileDto = z.object({
  name: z.string().optional(),
});

export const ChangePasswordDto = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(6),
});
