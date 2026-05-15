import { z } from 'zod';

export const createLogDto = z.object({
  action: z.string().min(1),
  entity: z.string().min(1),
  entityId: z.number().optional(),
  metadata: z.any().optional(),
});

export type CreateLogDto = z.infer<typeof createLogDto>;
