import { HttpLink, ApolloClient as client } from "@apollo/client";
import {
    registerApolloClient,
    ApolloClient,
    InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";




export const { query } = registerApolloClient(() => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        ssrMode: typeof window === 'undefined',
        link: new HttpLink({
            uri: process.env.BASE_URL,
            fetchOptions: { cache: "no-store" },
        }),
    });
});



export const createApolloClient = new client({
    ssrMode: true, // Enables server-side rendering
    link: new HttpLink({
        uri: process.env.BASE_URL,
        fetchOptions: { cache: "no-store" },
    }),
    cache: new InMemoryCache(),
});
;



