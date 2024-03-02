import { GraphQLList, GraphQLObjectType } from 'graphql';
import { MemberType, MemberTypeIdGQLEnum } from './type.js';
import { Environment } from '../types/environment.js';
import { MemberType as MemberTypePrisma } from '@prisma/client';

const memberTypes = {
  type: new GraphQLList(MemberType),
  resolve: async (__: unknown, _: unknown, { prisma }: Environment) => {
    return await prisma.memberType.findMany();
  },
};

const memberType = {
  type: MemberType as GraphQLObjectType,
  args: {
    id: { type: MemberTypeIdGQLEnum },
  },
  resolve: async (__: unknown, args: MemberTypePrisma, { prisma }: Environment) => {
    const { id } = args;
    return await prisma.memberType.findUnique({ where: { id } });
  },
}

export const MemberRequest = {
  memberTypes,
  memberType,
};
