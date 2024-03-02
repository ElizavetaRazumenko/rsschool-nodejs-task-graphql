import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { ProfileType } from '../profile/type.js';
import { Environment } from '../types/environment.js';
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
      resolve: async (target: User, _: unknown, { prisma }: Environment) => {
        const { id } = target;
        return await prisma.post.findMany({ where: { authorId: id } });
      },
    },
    profile: {
      type: ProfileType as GraphQLObjectType,
      resolve: async (target: User, _: unknown, { prisma }: Environment) => {
        const { id } = target;
        return await prisma.profile.findUnique({ where: { userId: id } });
      },
    },
  }),
});
