import { PrismaClient, User } from '@prisma/client';
import DataLoader from 'dataloader';

const batchUserDataLoader =
  (prisma: PrismaClient) => async (keys: readonly string[]) => {
    const usersMap = new Map<string, User>();
    const users = await prisma.user.findMany({
      where: { id: { in: [...keys] } },
    });

    users.forEach((user) => {
      usersMap.set(user.id, user);
    });

    return keys.map((key) => usersMap.get(key));
  };

export const createUserLoader = (prisma: PrismaClient) =>
  new DataLoader(batchUserDataLoader(prisma));
