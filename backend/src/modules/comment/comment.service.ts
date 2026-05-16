import { prisma } from '../../lib/prisma';
import { processMentions } from '../../utils/mention.helper';

export class CommentService {
  async createComment(datasetId: number, userId: number, content: string) {
    const comment = await prisma.comment.create({
      data: {
        datasetId,
        userId,
        content,
      },
      include: { user: { select: { id: true, name: true } } }
    });

    // Process mentions
    await processMentions(content, datasetId, userId);

    return comment;
  }

  // ... existing methods ...
}
