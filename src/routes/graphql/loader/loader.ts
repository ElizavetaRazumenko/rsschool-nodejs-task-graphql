import { PrismaClient } from '@prisma/client';
import { batchMemberTypeDataLoader } from './batchMemberType.js';
import { batchPostDataLoader } from './batchPost.js';
import { batchProfileDataLoader } from './batchProfile.js';
import { batchUserDataLoader } from './batchUser.js';

export const getDataLoaders = (prisma: PrismaClient) => ({
  memberTypeDataLoader: batchMemberTypeDataLoader(prisma),
  postDataLoader: batchPostDataLoader(prisma),
  profileDataLoader: batchProfileDataLoader(prisma),
  userDataLoader: batchUserDataLoader(prisma),
});
