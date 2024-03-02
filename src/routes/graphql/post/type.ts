import { GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { UserType } from '../user/type.js';
import { Post } from '@prisma/client';
import { Environment } from '../types/environment.js';

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
    author: {
      type: UserType as GraphQLObjectType,
      resolve: async (target: Post, __: unknown, { prisma }: Environment) => {
        const { authorId } = target;
        return prisma.post.findUnique({ where: { id: authorId } });
      },
    },
  }),
});
