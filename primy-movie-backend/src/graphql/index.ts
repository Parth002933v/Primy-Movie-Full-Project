//apollo graphQL
import { ApolloServer } from "@apollo/server";

import mergeDTypeDefs from "./mergeTypeDef";
import mergedResolvers from "./meregeResolvers";

import {
  ApolloServerPluginLandingPageLocalDefault,
} from "@apollo/server/plugin/landingPage/default";


import depthLimit from 'graphql-depth-limit';


export async function CreateApolloGraphQLServer() {
  interface MyContext {
    token?: String;
  }

  const apolloServerServer = new ApolloServer<MyContext>({
    typeDefs: mergeDTypeDefs,
    resolvers: mergedResolvers,
    introspection: false,
    validationRules: [depthLimit(5)],
    // plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
  });

  apolloServerServer.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

  return apolloServerServer;
}


