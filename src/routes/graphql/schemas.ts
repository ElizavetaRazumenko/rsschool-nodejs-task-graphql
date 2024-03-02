import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { UserRequest } from './user/query.js';
import { UserMutation } from './user/mutation.js';
import { PostRequest } from './post/query.js';
import { ProfileRequest } from './profile/query.js';
import { MemberRequest } from './member/query.js';

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
    ...UserRequest,
    ...ProfileRequest,
    ...MemberRequest,
  }),
});

export const graphQLSchema = new GraphQLSchema({ query });

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...UserMutation,
  },
});