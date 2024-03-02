import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { ProfileType } from '../profile/type.js';
import { Environment, UserSubscribesData } from '../types/environment.js';
import { User } from '@prisma/client';
import { PostType } from '../post/type.js';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
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
      async resolve(
        { id }: UserSubscribesData,
        _: unknown,
        { prisma, dataUsers }: Environment,
      ) {
        if (Array.isArray(dataUsers) && dataUsers.length) {
          const user = dataUsers.find((user) => user.id === id);
          return user ? user.subscribedToUser : null;
        }

        return await prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: id,
              },
            },
          },
        });
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      async resolve(
        { id }: UserSubscribesData,
        _: unknown,
        { prisma, dataUsers }: Environment,
      ) {
        if (Array.isArray(dataUsers) && dataUsers.length) {
          const user = dataUsers.find((user) => user.id === id);
          return user ? user.subscribedToUser : null;
        }

        return await prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: id,
              },
            },
          },
        });
      },
    },
  }),
});
