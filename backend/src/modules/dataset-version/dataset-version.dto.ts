import { z } from 'zod';

export const createVersionDto = z.object({
  version: z.string().min(1),
  description: z.string().optional(),
  metadata: z.any().optional(),
});

export type CreateVersionDto = z.infer<typeof createVersionDto>;
