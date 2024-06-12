import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./seaction/pages/Home.tsx";
import AddMovie from "./seaction/pages/AddMovie.tsx";
import ErrorPage from "./seaction/pages/ErrorPage.tsx";
import Genres from "./seaction/pages/Genres.tsx";
import MoviesProvider from "./seaction/pages/MoviesProvider.tsx";

// routes
import {
  ADD_MOVIE_PATH,
  ADD_BATCH_LINK_PATH,
  EDIT_PATH,
  GENERE_PATH,
  LOGIN_PATH,
  MOVIE_PROVIDE_PATH,
} from "./seaction/constant/routeContant.ts";
import { ThemeProvider } from "./components/theme-provider.tsx";
import Login from "./seaction/pages/Login.tsx";

import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import EditPage from "./seaction/pages/EditPage.tsx";
import BatchLinkPage from "./seaction/pages/batchLinkPage.tsx";


import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* <Route element={<AuthOutlet fallbackPath={LOGIN_PATH} />}> */}
      <Route index element={<Home />} />
      <Route path={ADD_MOVIE_PATH} element={<AddMovie />} />
      <Route path={GENERE_PATH} element={<Genres />} />
      <Route path={MOVIE_PROVIDE_PATH} element={<MoviesProvider />} />
      <Route path={ADD_BATCH_LINK_PATH} element={<BatchLinkPage />} />

      <Route path={`${EDIT_PATH}/:slugUrl`} element={<EditPage />} />

      <Route path="*" element={<ErrorPage />} />
      {/* </Route> */}
      <Route path={LOGIN_PATH} element={<Login />} />
    </Route>
  )
);

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: false,
});

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  cache: new InMemoryCache(),
});



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider store={store}>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);
