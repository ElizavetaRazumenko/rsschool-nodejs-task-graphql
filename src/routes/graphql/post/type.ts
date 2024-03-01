import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { UserType } from '../user/type.js';
import { Post } from '@prisma/client';
import { Context } from '../types/context.js';

export const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Post data',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
    author: {
      type: UserType,
      resolve: async (source: Post, __: unknown, { prisma }: Context) => {
        const { authorId } = source;
        return prisma.post.findUnique({ where: { id: authorId } });
      },
    },
  }),
});