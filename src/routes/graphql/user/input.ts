import {
  GraphQLFloat,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType
} from 'graphql';

const commonFields = {
  name: { type: GraphQLString },
  balance: { type: GraphQLFloat },
};

const createUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

const changeUserInput = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: commonFields,
});

export const CreateUserInput = createUserInput;
export const ChangeUserInput = changeUserInput;