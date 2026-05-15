import { z } from 'zod';

export const createDatasetDto = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  taskType: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().optional().default(false),
});

export const updateDatasetDto = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  taskType: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().optional(),
});

export type CreateDatasetDto = z.infer<typeof createDatasetDto>;
export type UpdateDatasetDto = z.infer<typeof updateDatasetDto>;
