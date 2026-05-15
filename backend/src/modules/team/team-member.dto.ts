import { z } from 'zod';

export const addMemberDto = z.object({
  userId: z.number(),
  role: z.enum(['MEMBER', 'ADMIN']).default('MEMBER'),
});

export type AddMemberDto = z.infer<typeof addMemberDto>;
