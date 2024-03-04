import { Environment } from '../types/environment.js';
import { UUIDType } from '../types/uuid.js';
import { UserType } from './type.js';
import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import {
  ChangeUserInputType,
  CreateUserInputType,
  DeleteUserInputType,
  UserSubscriptionType,
} from '../types/input.js';

const userInputFields = {
  name: { type: GraphQLString },
  balance: { type: GraphQLFloat },
};

const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({ ...userInputFields }),
});

const ChangeUserInput = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({ ...userInputFields }),
});

const createUser = {
  type: UserType as GraphQLObjectType,
  args: { dto: { type: new GraphQLNonNull(CreateUserInput) } },
  resolve: async (_: unknown, { dto }: CreateUserInputType, { prisma }: Environment) =>
    await prisma.user.create({ data: dto }),
};

const changeUser = {
  type: UserType as GraphQLObjectType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: ChangeUserInput },
  },
  resolve: async (
    _: unknown,
    { id, dto }: ChangeUserInputType,
    { prisma }: Environment,
  ) => await prisma.user.update({ where: { id }, data: dto }),
};

const deleteUser = {
  type: UUIDType,
  args: { id: { type: new GraphQLNonNull(UUIDType) } },
  resolve: async (_: unknown, { id }: DeleteUserInputType, { prisma }: Environment) => {
    await prisma.user.delete({ where: { id } });
    return id;
  },
};

const subscribeTo = {
  type: UserType as GraphQLObjectType,
  args: {
    userId: { type: new GraphQLNonNull(UUIDType) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (
    _: unknown,
    { userId, authorId }: UserSubscriptionType,
    { prisma }: Environment,
  ) =>
    await prisma.user.update({
      where: { id: userId },
      data: { userSubscribedTo: { create: { authorId } } },
    }),
};

const unsubscribeFrom = {
  type: UUIDType,
  args: {
    userId: { type: new GraphQLNonNull(UUIDType) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (
    _: unknown,
    { userId, authorId }: UserSubscriptionType,
    { prisma }: Environment,
  ) => {
    await prisma.subscribersOnAuthors.delete({
      where: {
        subscriberId_authorId: {
          subscriberId: userId,
          authorId,
        },
      },
    });
    return userId;
  },
};

export const UserMutations = {
  createUser,
  changeUser,
  deleteUser,
  subscribeTo,
  unsubscribeFrom,
};
