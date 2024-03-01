import { GraphQLList, GraphQLNonNull } from "graphql";
import { ProfileType } from "./type.js";
import { UUIDType } from "../types/uuid.js";
import { Profile } from "@prisma/client";
import { Context } from "../types/context.js";

export const ProfileQueries = {
  profile: {
    type: new GraphQLNonNull(ProfileType) ,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_: unknown, { id }: Profile, { prisma }: Context) => {
      return await prisma.profile.findUnique({ where: { id } });
    },
  },

  profiles: {
    type: new GraphQLList(ProfileType),
    resolve: async (_: unknown, __: unknown, { prisma }: Context) => {
      return await prisma.profile.findMany();
    },
  },
};