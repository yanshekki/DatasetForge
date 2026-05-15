import { z } from 'zod';

export const createTeamDto = z.object({
  name: z.string().min(1, 'Team name is required'),
  description: z.string().optional(),
});

export type CreateTeamDto = z.infer<typeof createTeamDto>;
