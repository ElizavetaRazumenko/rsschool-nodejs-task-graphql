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
import { UserSubscription } from '../types/userSubscription.js';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async ({ id }: User, _: unknown, { loaders }: Environment) =>
        await loaders.postDataLoader.load(id),
    },
    profile: {
      type: ProfileType as GraphQLObjectType,
      resolve: async ({ id }: User, _: unknown, { loaders }: Environment) =>
        await loaders.profileDataLoader.load(id),
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (
        { subscribedToUser }: UserSubscription,
        _: unknown,
        { loaders }: Environment,
      ) => {
        if (Array.isArray(subscribedToUser) && subscribedToUser.length) {
          return await loaders.userDataLoader.loadMany(
            subscribedToUser.map(({ subscriberId }) => subscriberId),
          );
        }
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (
        { userSubscribedTo }: UserSubscription,
        _: unknown,
        { loaders }: Environment,
      ) => {
        if (Array.isArray(userSubscribedTo) && userSubscribedTo.length) {
          return await loaders.userDataLoader.loadMany(
            userSubscribedTo.map(({ authorId }) => authorId),
          );
        }
      },
    },
  }),
});
