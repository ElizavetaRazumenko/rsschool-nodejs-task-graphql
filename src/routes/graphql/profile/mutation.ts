/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { MemberTypeIdGQLEnum } from '../member/type.js';
import { ProfileType } from './type.js';
import {
  ChangeProfileInputType,
  CreateProfileInputType,
  DeleteProfileInputType,
} from '../types/input.js';
import { Environment } from '../types/environment.js';

const profileInputFields = {
  isMale: { type: GraphQLBoolean },
  yearOfBirth: { type: GraphQLInt },
  memberTypeId: { type: MemberTypeIdGQLEnum },
};

const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    ...profileInputFields,
    userId: { type: UUIDType },
  }),
});

const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => profileInputFields,
});

const createProfile = {
  type: ProfileType as GraphQLObjectType,
  args: { dto: { type: new GraphQLNonNull(CreateProfileInput) } },
  resolve: async (_: unknown, { dto }: CreateProfileInputType, { prisma }: Environment) =>
    await prisma.profile.create({ data: dto }),
};

const changeProfile = {
  type: ProfileType as GraphQLObjectType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(ChangeProfileInput) },
  },
  resolve: async (
    _: unknown,
    { id, dto }: { id: string; dto: ChangeProfileInputType },
    { prisma }: Environment,
  ) => await prisma.profile.update({ where: { id }, data: dto }),
};

const deleteProfile = {
  type: UUIDType,
  args: { id: { type: new GraphQLNonNull(UUIDType) } },
  resolve: async (
    _: unknown,
    { id }: DeleteProfileInputType,
    { prisma }: Environment,
  ) => {
    await prisma.profile.delete({ where: { id } });
    return id;
  },
};

export const ProfileMutations = {
  createProfile,
  changeProfile,
  deleteProfile,
};
