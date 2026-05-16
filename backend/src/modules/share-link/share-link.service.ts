import { prisma } from '../../lib/prisma';
import { randomBytes } from 'crypto';

export class ShareLinkService {
  async createShareLink(datasetId: number, permission: string = 'READ', expiresInDays?: number) {
    const token = randomBytes(32).toString('hex');
    const expiresAt = expiresInDays 
      ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000) 
      : null;

    return prisma.shareLink.create({
      data: {
        datasetId,
        token,
        permission,
        expiresAt,
      },
    });
  }

  async getDatasetByShareToken(token: string) {
    const shareLink = await prisma.shareLink.findUnique({
      where: { token },
      include: { dataset: true },
    });

    if (!shareLink) return null;
    if (shareLink.expiresAt && shareLink.expiresAt < new Date()) return null;

    return shareLink.dataset;
  }

  async revokeShareLink(token: string) {
    return prisma.shareLink.delete({ where: { token } });
  }
}
