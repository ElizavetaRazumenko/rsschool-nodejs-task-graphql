import { User } from "@prisma/client";
import { GraphQLList, GraphQLNonNull } from "graphql";
import { UserType } from "./type.js";

import { UUIDType } from "../types/uuid.js";
import { Context } from "../types/context.js";


export const UserQueries = {
  user: {
    type: new GraphQLNonNull(UserType),
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_: unknown, { id }: User, { prisma }: Context) => {
      return await prisma.user.findFirst({ where: { id } });
    },
  },

  users: {
    type: new GraphQLList(UserType),
    resolve: async (_: unknown, __: unknown, { prisma }: Context) => {
      return await prisma.user.findMany();
    },
  },
};