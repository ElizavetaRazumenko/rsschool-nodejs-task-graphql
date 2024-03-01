import { GraphQLList, GraphQLNonNull } from "graphql";
import { MemberType, MemberTypeIdEnum } from "./type.js";
import { Context } from "../types/context.js";
import { MemberType as MemberTypePrisma } from '@prisma/client';

export const MemberTypeQueries = {
  memberType: {
    type: new GraphQLNonNull(MemberType),
    args: {
      id: { type: new GraphQLNonNull(MemberTypeIdEnum) },
    },
    resolve: async (__: unknown, args: MemberTypePrisma, { prisma }: Context) => {
      const { id } = args;
      return await prisma.memberType.findUnique({ where: { id } });
    },
  },

  memberTypes: {
    type: new GraphQLList(MemberType),
    resolve: async (__: unknown, _: unknown, { prisma }: Context) => {
      return await prisma.memberType.findMany();
    },
  },
};