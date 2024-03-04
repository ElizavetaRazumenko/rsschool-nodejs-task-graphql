import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { ProfileType } from './type.js';
import { UUIDType } from '../types/uuid.js';
import { Profile } from '@prisma/client';
import { Environment } from '../types/environment.js';

const profiles = {
  type: new GraphQLList(ProfileType),
  resolve: async (_: unknown, __: unknown, { prisma }: Environment) =>
    await prisma.profile.findMany(),
};

const profile = {
  type: ProfileType as GraphQLObjectType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_: unknown, { id }: Profile, { prisma }: Environment) =>
    await prisma.profile.findUnique({ where: { id } }),
};

export const ProfileRequest = {
  profiles,
  profile,
};
