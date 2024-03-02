import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { PostType } from './type.js';
import {
  ChangePostInputType,
  CreatePostInputType,
  DeletePostInputType,
} from '../types/input.js';
import { Environment } from '../types/environment.js';

const postInputFields = {
  authorId: { type: UUIDType },
  content: { type: GraphQLString },
  title: { type: GraphQLString },
};

const CreatePostInput = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: () => postInputFields,
});

const ChangePostInput = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: () => postInputFields,
});

const createPost = {
  type: PostType as GraphQLObjectType,
  args: { dto: { type: new GraphQLNonNull(CreatePostInput) } },
  resolve: async (_: unknown, { dto }: CreatePostInputType, { prisma }: Environment) =>
    await prisma.post.create({ data: dto }),
};

const changePost = {
  type: PostType as GraphQLObjectType,
  args: { id: { type: new GraphQLNonNull(UUIDType) }, dto: { type: ChangePostInput } },
  resolve: async (
    _: unknown,
    { id, dto }: ChangePostInputType,
    { prisma }: Environment,
  ) => await prisma.post.update({ where: { id }, data: dto }),
};

const deletePost = {
  type: UUIDType,
  args: { id: { type: new GraphQLNonNull(UUIDType) } },
  resolve: async (_: unknown, { id }: DeletePostInputType, { prisma }: Environment) =>
    (await prisma.post.delete({ where: { id } })).id,
};

export const PostMutations = {
  createPost,
  changePost,
  deletePost,
};
