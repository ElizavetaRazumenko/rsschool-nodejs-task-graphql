import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType } from "graphql";
import { ProfileType } from "../profile/type.js";
import { Context } from "../types/context.js";
import { MemberType as MemberTypePrisma } from '@prisma/client';

enum MemberTypeId {
  BASIC = 'basic',
  BUSINESS = 'business',
}

export const MemberTypeIdEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: { value: MemberTypeId.BASIC },
    business: { value: MemberTypeId.BUSINESS },
  },
});

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  description: 'MemberType data',
  fields: () => ({
    id: { type: MemberTypeIdEnum },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (source: MemberTypePrisma, __: unknown, { prisma }: Context) => {
        const { id } = source;
        return await prisma.profile.findMany({ where: { memberTypeId: id } });
      },
    },
  }),
});