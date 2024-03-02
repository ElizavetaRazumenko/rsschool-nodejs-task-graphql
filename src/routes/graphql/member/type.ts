import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} from 'graphql';
import { ProfileType } from '../profile/type.js';
import { Environment } from '../types/environment.js';
import { MemberType as MemberTypePrisma } from '@prisma/client';

enum MemberTypeId {
  BASIC = 'basic',
  BUSINESS = 'business',
}

export const MemberTypeIdGQLEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: { value: MemberTypeId.BASIC },
    business: { value: MemberTypeId.BUSINESS },
  },
});

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: MemberTypeIdGQLEnum },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async ({ id }: MemberTypePrisma, __: unknown, { prisma }: Environment) =>
        await prisma.profile.findMany({ where: { memberTypeId: id } }),
    },
  }),
});
