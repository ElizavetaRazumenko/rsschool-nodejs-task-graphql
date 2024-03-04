import { PrismaClient } from '@prisma/client';
import { createPostsLoader } from './createPostLoader.js';
import { createProfileLoader } from './createProfileLoader.js';
import { createUserLoader } from './createUserLoader.js';
import { createUserToSubLoader } from './createUserToSubscribeLoader.js';
import { createSubToUserLoader } from './createSubToUserLoader.js';
import { createMemberTypeLoader } from './createMemberLoader.js';

export const getDataLoaders = (prisma: PrismaClient) => ({
  memberTypeLoader: createMemberTypeLoader(prisma),
  postsLoader: createPostsLoader(prisma),
  profileLoader: createProfileLoader(prisma),
  userLoader: createUserLoader(prisma),
  subscribedToUser: createSubToUserLoader(prisma),
  userSubscribedToLoader: createUserToSubLoader(prisma),
});
