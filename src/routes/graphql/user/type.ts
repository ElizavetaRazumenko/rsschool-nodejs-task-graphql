import { GraphQLFloat, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "../types/uuid.js";

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User data',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
});