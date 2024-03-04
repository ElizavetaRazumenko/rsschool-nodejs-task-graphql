import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { SubscriptionToUser } from '../types/userSubscription.js';

const batchUserSubTo = (prisma: PrismaClient) => async (keys: readonly string[]) => {
  const subsMap = new Map<string, SubscriptionToUser[]>();
  const usersSubs = await prisma.user.findMany({
    where: {
      subscribedToUser: {
        some: {
          subscriberId: {
            in: [...keys],
          },
        },
      },
    },
    include: {
      subscribedToUser: true,
    },
  });

  const subs = usersSubs.reduce((map, sub) => {
    sub.subscribedToUser.forEach((subscription) => {
      const existSub = map.get(subscription.subscriberId) || [];
      existSub.push(sub);
      map.set(subscription.subscriberId, existSub);
    });
    return map;
  }, subsMap);

  return keys.map((key) => subs.get(key) || []);
};

export const createUserToSubLoader = (prisma: PrismaClient) =>
  new DataLoader(batchUserSubTo(prisma));
