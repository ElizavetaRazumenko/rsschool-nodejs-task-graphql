import { User } from '@prisma/client';
import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLResolveInfo,
} from 'graphql';
import { UserType } from './type.js';
import { UUIDType } from '../types/uuid.js';
import { Environment } from '../types/environment.js';
import {
  ResolveTree,
  parseResolveInfo,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';

enum SubscribeFields {
  SUB_TO_USER = 'subscribedToUser',
  USER_SUB_TO = 'userSubscribedTo',
}

const users = {
  type: new GraphQLList(UserType),
  resolve: async (
    _: unknown,
    __: unknown,
    { prisma, loaders }: Environment,
    resolveInfo: GraphQLResolveInfo,
  ) => {
    const include = {};
    const subFields = [SubscribeFields.USER_SUB_TO, SubscribeFields.SUB_TO_USER];

    const { returnType } = resolveInfo;
    const { fields } = simplifyParsedResolveInfoFragmentWithType(
      parseResolveInfo(resolveInfo) as ResolveTree,
      returnType,
    );

    for (const field of subFields) {
      include[field] = fields[field] !== undefined;
    }

    const users = await prisma.user.findMany({ include });

    users.forEach((user) => {
      loaders.userDataLoader.prime(user.id, user);
    });
    return users;
  },
};

const user = {
  type: UserType as GraphQLObjectType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_: unknown, { id }: User, { loaders }: Environment) =>
    await loaders.userDataLoader.load(id),
};

export const UserRequest = {
  users,
  user,
};
