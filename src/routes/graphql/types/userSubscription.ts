import { User } from '@prisma/client';
type Subscribe = {
  subscriberId: string;
  authorId: string;
};

export interface UserSubscription extends User {
  userSubscribedTo: Subscribe[];
}

export interface SubscriptionToUser extends User {
  subscribedToUser: Subscribe[];
}
