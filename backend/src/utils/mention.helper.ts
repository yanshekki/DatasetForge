import { prisma } from '../lib/prisma';
import { sendNotification } from './notification.helper';

export const processMentions = async (content: string, datasetId: number, commenterId: number) => {
  const mentionRegex = /@(\w+)/g;
  const mentions = content.match(mentionRegex) || [];

  for (const mention of mentions) {
    const username = mention.substring(1);
    const user = await prisma.user.findFirst({
      where: { name: { equals: username, mode: 'insensitive' } }
    });

    if (user && user.id !== commenterId) {
      await sendNotification(
        user.id,
        'MENTIONED_IN_COMMENT',
        'You were mentioned in a comment',
        `You were mentioned in a comment on dataset #${datasetId}`,
        user.email
      );
    }
  }
};
