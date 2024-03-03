/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberType, MemberTypeIdGQLEnum } from './type.js';
import { Environment } from '../types/environment.js';
import { MemberType as MemberTypePrisma } from '@prisma/client';

const memberTypes = {
  type: new GraphQLList(MemberType),
  resolve: async (__: unknown, _: unknown, { prisma }: Environment) =>
    await prisma.memberType.findMany(),
};

const memberType = {
  type: MemberType as GraphQLObjectType,
  args: {
    id: { type: new GraphQLNonNull(MemberTypeIdGQLEnum) },
  },
  resolve: async (__: unknown, { id }: MemberTypePrisma, { prisma }: Environment) =>
    await prisma.memberType.findUnique({ where: { id } }),
};

export const MemberRequest = {
  memberTypes,
  memberType,
};
