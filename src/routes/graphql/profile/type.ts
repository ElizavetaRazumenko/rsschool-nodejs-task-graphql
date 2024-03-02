import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { MemberType, MemberTypeIdGQLEnum } from '../member/type.js';
import { UserType } from '../user/type.js';
import { Profile } from '@prisma/client';
import { Environment } from '../types/environment.js';

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeIdGQLEnum },
    user: {
      type: UserType as GraphQLObjectType,
      resolve: async (target: Profile, __: unknown, { prisma }: Environment) => {
        const { userId } = target;
        return await prisma.user.findUnique({ where: { id: userId } });
      },
    },
    memberType: {
      type: MemberType as GraphQLObjectType,
      resolve: async (target: Profile, __: unknown, { prisma }: Environment) => {
        const { memberTypeId } = target;
        return await prisma.memberType.findUnique({ where: { id: memberTypeId } });
      },
    },
  }),
});
