import { PrismaClient } from '@prisma/client';

export type Environment = {
  prisma: PrismaClient;
}

