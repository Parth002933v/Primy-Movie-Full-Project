import { HttpLink, ApolloClient as client } from "@apollo/client";
import {
    InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

import { cookies } from "next/headers";

export const createApolloClient = (cookie?: RequestCookie) => new client({
    ssrMode: true,
    link: new HttpLink({
        headers: {
            authorization: `Bearer ${cookie ? cookie.value : cookies().get("_auth")?.value || "undefined"}`
            // authorization: `Bearer ${(cookies().get("_auth")?.value) || "undefined"}`,
        },
        uri: process.env.BASE_URL,
        fetchOptions: { cache: "no-store" },
    }),
    cache: new InMemoryCache(),
});
;



