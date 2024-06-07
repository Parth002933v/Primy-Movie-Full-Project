//env
import dotenv from "dotenv";

// express
import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import http from "http";
import session from "express-session";
import connectMongo from "connect-mongodb-session";

// mongoose
import connectDB from "./db";

import mergeDTypeDefs from "./graphql/mergeTypeDef";
import mergedResolvers from "./graphql/meregeResolvers";

//routes
// import adminRouter from "./routes/admin.route";
// import movieRouter from "./routes/movie.route";
// import genereRouter from "./routes/genere.route";
// import ageRatingRouter from "./routes/ageRating.route";
// import languageRouter from "./routes/language.route";
// import videoQualityRouter from "./routes/videoQualitys.route";
// import categoryRouter from "./routes/category.route";
// import MovieProviserRouter from "./routes/movieProvider.router";
//handlers
// import customError from "./utils/ErrorObject";
// import { globalErrorHandler } from "./middleware/errorHandler.middleware";

//apollo graphQL
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { CreateApolloGraphQLServer } from "./graphql/index";

// Create Express app
const app: Express = express();

dotenv.config({ path: ".env" });

// // Start the server
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

// app.use(cors());
// app.use(express.static("public"));

// Define a route handler for the root path
app.get("/", (req: Request, res: Response) => {
  res.end("server is running...");
});

async function init() {
  app.use("/graphql", expressMiddleware(await CreateApolloGraphQLServer()));
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

//=======================================================================

// //api routes
// app.use("/api/admin", adminRouter);
// app.use("/api/movies", movieRouter);
// app.use("/api/generes", genereRouter);
// app.use("/api/age-rating", ageRatingRouter);
// app.use("/api/language", languageRouter);
// app.use("/api/video-quality", videoQualityRouter);
// app.use("/api/category", categoryRouter);

// app.use("/api/movie-provider", MovieProviserRouter);

// // for incorrect route
// app.use("*", (req, res, next) => {
//   const error = new customError({
//     message: `can't find ${req.originalUrl} on the server`,
//     statusCode: 404,
//   });

//   next(error);
// });

// // global error handler
// app.use(globalErrorHandler);
