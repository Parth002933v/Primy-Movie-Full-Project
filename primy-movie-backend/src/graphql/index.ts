//apollo graphQL
import { ApolloServer } from "@apollo/server";

import mergeDTypeDefs from "./mergeTypeDef";
import mergedResolvers from "./meregeResolvers";

import {
  ApolloServerPluginLandingPageLocalDefault,
} from "@apollo/server/plugin/landingPage/default";

export async function CreateApolloGraphQLServer() {
  interface MyContext {
    token?: String;
  }

  const apolloServerServer = new ApolloServer<MyContext>({
    typeDefs: mergeDTypeDefs,
    resolvers: mergedResolvers,
    introspection: true,

    plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
  });

  await apolloServerServer.start();

  return apolloServerServer;
}
