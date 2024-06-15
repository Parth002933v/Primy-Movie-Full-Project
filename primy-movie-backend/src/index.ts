//env
import dotenv from "dotenv";

// express
import express, { Express, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser"

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


import jwt from "jsonwebtoken";



import CustomError, { errorCodeEnum } from "./utils/ErrorObject";
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptionsWithoutRequest } from "passport-jwt"
import { AdminModel } from "./model/admin_model";


// Create Express app
const app: Express = express();
passportConfiguration()

dotenv.config({ path: ".env" });



// const MongoDBStrore = connectMongo(session)
// const store = new MongoDBStrore({
//   uri: `${process.env.MONGODB_URL}`, collection: 'Sessions',
//   databaseName: `${process.env.MONGODB_DATABSE_NAME}`,
//   expires: 1000 * 60 * 60 * 24 * 5,
// })

// Catch errors
// store.on('error', function (error) {
//   console.log(error);
// });

// app.use(session({
//   secret: `${process.env.SESSION_SECRET}`,
//   resave: true,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24 * 5 // 1 week
//   },
//   store: store,
// }));


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
app.use(cors())
app.use(express.static("public"));
app.use(cookieParser())
app.use(passport.initialize())

// Define a route handler for the root path
app.get("/", (req: Request, res: Response) => {
  res.end("server is running...");
});

async function init() {
  app.use("/graphql", expressMiddleware(await CreateApolloGraphQLServer(), {
    context: async ({ req, res }) => {

      try {
        const token = req.headers.authorization?.split(' ')[1] || req.cookies?.accessToken || "";

        const decodedToken = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`) as { _id: string };
        req.user = decodedToken._id

        console.log(req.user);


        return { req: req, res: res }
      } catch (error) {
        console.log(error);

        return { req: req, res: res }
      }

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
