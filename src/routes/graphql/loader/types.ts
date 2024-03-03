import DataLoader from 'dataloader';
import { MemberType, User, Profile, Post } from '@prisma/client';

export type DataLoaders = {
  memberTypeDataLoader: DataLoader<string, MemberType | undefined>;
  postDataLoader: DataLoader<string, Post[] | undefined>;
  profileDataLoader: DataLoader<string, Profile | undefined>;
  userDataLoader: DataLoader<string, User | undefined>;
};
