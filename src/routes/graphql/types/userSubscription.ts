import { User } from '@prisma/client';
type Subscribe = {
  subscriberId: string;
  authorId: string;
};

export interface UserSubscription extends User {
  subscribedToUser?: Subscribe[];
  userSubscribedTo?: Subscribe[];
}
