import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { UserRequest } from './user/query.js';
import { UserMutations } from './user/mutation.js';
import { PostRequest } from './post/query.js';
import { ProfileRequest } from './profile/query.js';
import { MemberRequest } from './member/query.js';
import { PostMutations } from './post/mutation.js';
import { ProfileMutations } from './profile/mutation.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...PostRequest,
    ...ProfileRequest,
    ...MemberRequest,
    ...UserRequest,
  }),
});

export const graphQLSchema = new GraphQLSchema({ query });

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...PostMutations,
    ...ProfileMutations,
    ...UserMutations,
  },
});
