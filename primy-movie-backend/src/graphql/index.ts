//apollo graphQL
import { ApolloServer } from "@apollo/server";

import mergeDTypeDefs from "./mergeTypeDef";
import mergedResolvers from "./meregeResolvers";

import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { GraphQLError, GraphQLFormattedError } from "graphql";

export async function CreateApolloGraphQLServer() {
  interface MyContext {
    token?: String;
  }

  const apolloServerServer = new ApolloServer<MyContext>({
    typeDefs: mergeDTypeDefs,
    resolvers: mergedResolvers,
    introspection: true,
    formatError: (formattedError: GraphQLFormattedError, error: any) => {
   

      return formattedError;
    },
    plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
  });

  await apolloServerServer.start();

  return apolloServerServer;
}
