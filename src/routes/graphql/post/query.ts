import { GraphQLList, GraphQLNonNull } from 'graphql';
import { PostType } from './type.js';
import { UUIDType } from '../types/uuid.js';
import { Post } from '@prisma/client';
import { Context } from '../types/context.js';

export const PostQueries = {
  post: {
    type: new GraphQLNonNull(PostType),
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_: unknown, { id }: Post, { prisma }: Context) => {
      return await prisma.post.findUnique({ where: { id } });
    },
  },

  posts: {
    type: new GraphQLList(PostType),
    resolve: async (_: unknown, __: unknown, { prisma }: Context) => {
      return await prisma.post.findMany();
    },
  },
};
