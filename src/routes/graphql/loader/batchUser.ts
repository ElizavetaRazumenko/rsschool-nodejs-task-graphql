import { PrismaClient, User } from '@prisma/client';
import DataLoader from 'dataloader';

export const batchUserDataLoader = (prisma: PrismaClient) =>
  new DataLoader<string, User | undefined>(async (keys: readonly string[]) => {
    const usersMap = new Map<string, User>();
    const users = await prisma.user.findMany({
      where: { id: { in: [...keys] } },
      include: { userSubscribedTo: true, subscribedToUser: true },
    });

    users.forEach((user) => {
      usersMap.set(user.id, user);
    });

    return keys.map((key) => usersMap.get(key));
  });
