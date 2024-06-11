//env
import dotenv from "dotenv";

// express
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import http from "http";

import session from "express-session";
import connectMongo from "connect-mongodb-session";
import passport from "passport"
import { buildContext } from "graphql-passport";
import { passportConfiguration } from "./passport/passport.config"

// mongoose
import connectDB from "./db";

//apollo graphQL
import { expressMiddleware } from "@apollo/server/express4";

import { CreateApolloGraphQLServer } from "./graphql/index";

// Create Express app
const app: Express = express();
passportConfiguration()

dotenv.config({ path: ".env" });



const MongoDBStrore = connectMongo(session)
const store = new MongoDBStrore({
  uri: `${process.env.MONGODB_URL}`, collection: 'Sessions',
  databaseName: `${process.env.MONGODB_DATABSE_NAME}`,
  expires: 1000 * 60 * 60 * 24 * 5,
})

// Catch errors
store.on('error', function (error) {
  console.log(error);
});

app.use(session({
  secret: `${process.env.SESSION_SECRET}`,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 5 // 1 week
  },
  store: store,
}));


// Start the server
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/`);
});

process.on("uncaughtException", (err: Error) => {
  console.log(err.message);
  console.log("unhandled rejection is occured! shutting down...");

  server.close();
});

//connectDB
connectDB();

//middlewares
app.use(express.json());
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static("public"));

// Define a route handler for the root path
app.get("/", (req: Request, res: Response) => {
  res.end("server is running...");
});

async function init() {
  app.use("/graphql", expressMiddleware(await CreateApolloGraphQLServer(), {
    context: async ({ req, res }) => {
      return buildContext({ req, res })

    }
  }))
}
init();

// if unhandled exception in occcure the app will shutdown
process.on("unhandledRejection", (err: Error) => {
  console.log(err.message);
  console.log("unhandled rejection is occured! shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
