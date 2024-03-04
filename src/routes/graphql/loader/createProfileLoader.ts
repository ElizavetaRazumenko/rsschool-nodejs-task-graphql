import { PrismaClient, Profile } from '@prisma/client';
import DataLoader from 'dataloader';

const batchProfileDataLoader =
  (prisma: PrismaClient) => async (keys: readonly string[]) => {
    const profilesMap = new Map<string, Profile>();
    const profiles = await prisma.profile.findMany({
      where: { userId: { in: [...keys] } },
    });

    profiles.forEach((profile) => profilesMap.set(profile.userId, profile));

    return keys.map((id) => profilesMap.get(id));
  };

export const createProfileLoader = (prisma: PrismaClient) =>
  new DataLoader(batchProfileDataLoader(prisma));
