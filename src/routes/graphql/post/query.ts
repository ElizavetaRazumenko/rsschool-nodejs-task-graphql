import { GraphQLList, GraphQLObjectType } from 'graphql';
import { PostType } from './type.js';
import { UUIDType } from '../types/uuid.js';
import { Post } from '@prisma/client';
import { Environment } from '../types/environment.js';

const posts = {
  type: new GraphQLList(PostType),
  resolve: async (_: unknown, __: unknown, { prisma }: Environment) =>
    await prisma.post.findMany(),
};

const post = {
  type: PostType as GraphQLObjectType,
  args: {
    id: { type: UUIDType },
  },
  resolve: async (_: unknown, { id }: Post, { prisma }: Environment) =>
    await prisma.post.findUnique({ where: { id } }),
};

export const PostRequest = {
  posts,
  post,
};
