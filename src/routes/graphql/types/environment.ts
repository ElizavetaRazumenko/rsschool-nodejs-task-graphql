import { DataLoaders } from '../loader/types.js';
import { PrismaClient } from '@prisma/client';

export type Environment = {
  prisma: PrismaClient;
  loaders: DataLoaders;
};
