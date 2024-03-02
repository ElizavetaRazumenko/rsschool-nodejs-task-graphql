import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { ProfileType } from '../profile/type.js';
import { Environment } from '../types/environment.js';
import { User } from '@prisma/client';
import { PostType } from '../post/type.js';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async ({ id }: User, _: unknown, { prisma }: Environment) =>
        await prisma.post.findMany({ where: { authorId: id } }),
    },
    profile: {
      type: ProfileType as GraphQLObjectType,
      resolve: async ({ id }: User, _: unknown, { prisma }: Environment) =>
        await prisma.profile.findUnique({ where: { userId: id } }),
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: User, _: unknown, { prisma }: Environment) =>
        await prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: id,
              },
            },
          },
        }),
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: User, __: unknown, { prisma }: Environment) =>
        await prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: id,
              },
            },
          },
        }),
    },
  }),
});
