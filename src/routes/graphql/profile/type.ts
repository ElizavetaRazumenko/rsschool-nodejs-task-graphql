import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "../types/uuid.js";
import { MemberType, MemberTypeIdEnum } from "../member/type.js";
import { UserType } from "../user/type.js";
import { Profile } from "@prisma/client";
import { Context } from "../types/context.js";

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  description: 'Profile data',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeIdEnum },
    user: {
      type: UserType,
      resolve: async (source: Profile, __: unknown, { prisma }: Context) => {
        const { userId } = source;
        return await prisma.user.findUnique({ where: { id: userId } });
      },
    },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      resolve: async (source: Profile, __: unknown, { prisma }: Context) => {
        const { memberTypeId } = source;
        return await prisma.memberType.findUnique({ where: { id: memberTypeId } });
      },
    },
  }),
});