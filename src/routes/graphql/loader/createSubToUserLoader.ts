import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { UserSubscription } from '../types/userSubscription.js';

const batchSubToUser = (prisma: PrismaClient) => async (keys: readonly string[]) => {
  const usersMap = new Map<string, UserSubscription[]>();
  const usersSubs = await prisma.user.findMany({
    where: {
      userSubscribedTo: {
        some: {
          authorId: {
            in: [...keys],
          },
        },
      },
    },
    include: {
      userSubscribedTo: true,
    },
  });

  const users = usersSubs.reduce((map, sub) => {
    sub.userSubscribedTo.forEach((subscription) => {
      const authorsList = map.get(subscription.authorId) || [];
      authorsList.push(sub);
      map.set(subscription.authorId, authorsList);
    });
    return map;
  }, usersMap);

  return keys.map((key) => users.get(key) || []);
};

export const createSubToUserLoader = (prisma: PrismaClient) =>
  new DataLoader(batchSubToUser(prisma));
