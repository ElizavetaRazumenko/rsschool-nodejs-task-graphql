import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { MemberType, MemberTypeIdGQLEnum } from '../member/type.js';
import { UserType } from '../user/type.js';
import { Profile } from '@prisma/client';
import { Environment } from '../types/environment.js';

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  description: 'Profile data',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeIdGQLEnum },
    user: {
      type: UserType as GraphQLObjectType,
      resolve: async ({ userId }: Profile, _: unknown, { prisma }: Environment) =>
        await prisma.user.findUnique({ where: { id: userId } }),
    },
    memberType: {
      type: MemberType as GraphQLObjectType,
      resolve: async ({ memberTypeId }: Profile, _: unknown, { prisma }: Environment) =>
        await prisma.memberType.findUnique({ where: { id: memberTypeId } }),
    },
  }),
});
