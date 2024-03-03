import { User } from '@prisma/client';
import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { UserType } from './type.js';
import { UUIDType } from '../types/uuid.js';
import { Environment } from '../types/environment.js';

const users = {
  type: new GraphQLList(UserType),
  resolve: async (_: unknown, __: unknown, { prisma }: Environment) =>
    await prisma.user.findMany(),
};

const user = {
  type: UserType as GraphQLObjectType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_: unknown, { id }: User, { prisma }: Environment) =>
    await prisma.user.findUnique({ where: { id } }),
};

export const UserRequest = {
  users,
  user,
};
