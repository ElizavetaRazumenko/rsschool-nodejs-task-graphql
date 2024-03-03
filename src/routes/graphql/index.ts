import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, graphQLSchema } from './schemas.js';
import { GraphQLError, graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { getDataLoaders } from './loader/loader.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },

    async handler(req) {
      const { query, variables } = req.body;

      const dataLoaders = getDataLoaders(prisma);

      try {
        const validationErrors = validate(graphQLSchema, parse(query), [depthLimit(5)]);

        if (validationErrors.length) {
          console.log('Maximum depth exceeded: 5');
          return { errors: validationErrors };
        }

        const { data, errors } = await graphql({
          schema: graphQLSchema,
          source: query,
          variableValues: variables,
          contextValue: {
            prisma,
            dataLoaders,
          },
        });

        return { data, errors };
      } catch (error) {
        if (error instanceof GraphQLError) {
          console.log('Error of GraphQL request:', error.message);
        }

        return { errors: [error] };
      }
    },
  });
};

export default plugin;
