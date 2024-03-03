import { MemberType, PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

const batchMemberTypeDataLoader =
  (prisma: PrismaClient) => async (keys: readonly string[]) => {
    const memberTypeMap = new Map<string, MemberType>();
    const members = await prisma.memberType.findMany({
      where: { id: { in: [...keys] } },
    });

    members.forEach((memberType) => {
      memberTypeMap.set(memberType.id, memberType);
    });

    return keys.map((key) => memberTypeMap.get(key));
  };

export const createMemberTypeLoader = (prisma: PrismaClient) =>
  new DataLoader(batchMemberTypeDataLoader(prisma));
