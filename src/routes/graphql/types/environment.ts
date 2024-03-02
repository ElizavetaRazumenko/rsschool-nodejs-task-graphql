import { PrismaClient, User } from '@prisma/client';

export type Environment = {
  prisma: PrismaClient;
  dataUsers?: UserSubscribesData[];
}

export interface UserSubscribesData extends User {
  userSubscribedTo?: UserSubscription[];
  subscribedToUser?: UserSubscription[];
}

export type UserSubscription = {
  subscriberId: string;
  authorId: string;
}