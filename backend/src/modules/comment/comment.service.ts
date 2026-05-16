import { prisma } from '../../lib/prisma';

export class CommentService {
  async createComment(datasetId: number, userId: number, content: string) {
    return prisma.comment.create({
      data: {
        datasetId,
        userId,
        content,
      },
      include: { user: { select: { id: true, name: true } } }
    });
  }

  async getCommentsByDataset(datasetId: number) {
    return prisma.comment.findMany({
      where: { datasetId },
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, name: true } } }
    });
  }

  async deleteComment(commentId: number, userId: number) {
    return prisma.comment.deleteMany({
      where: { id: commentId, userId }
    });
  }
}
