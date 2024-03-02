import { User } from '@prisma/client';
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

const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInputType',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

const ChangeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInputType',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});

const createUser = {
  type: UserType as GraphQLObjectType,
  args: { data: { type: CreateUserInputType } },
  resolve: async (__: unknown, { data }: { data: User }, { prisma }: Environment) =>
    await prisma.user.create({ data }),
};

const changeUser = {
  type: UserType as GraphQLObjectType,
  args: { id: { type: UUIDType }, data: { type: ChangeUserInputType } },
  resolve: async (
    __: unknown,
    { id, data }: { id: string; data: User },
    { prisma }: Environment,
  ) => await prisma.user.update({ where: { id }, data }),
};

export const UserMutation = {
  createUser,
  changeUser,
};
