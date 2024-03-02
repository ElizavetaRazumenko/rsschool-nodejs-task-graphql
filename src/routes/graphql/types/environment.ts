import { PrismaClient, User } from '@prisma/client';

export type Environment = {
  prisma: PrismaClient;
}

export interface UserSub extends User {
  userSubscribedTo?: UserSubscription[];
  subscribedToUser?: UserSubscription[];
}

export type UserSubscription = {
  subscriberId: string;
  authorId: string;
}