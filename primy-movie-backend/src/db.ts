import mongoose from "mongoose";
import MovieModel from "./model/movie_model";
import { getSSMParam } from "./utils/secrets";


async function connectDB() {



  const dbUrl = await getSSMParam({ name: "/primy-movie-backend/prod/databse-url" })

  console.log(`${dbUrl}/${process.env.MONGODB_DATABSE_NAME}`);

  mongoose
    .connect(`${dbUrl}/${process.env.MONGODB_DATABSE_NAME}`)
    .then(() => {
      console.log("MongoDB Connected!");

      MovieModel.init().then(() => {
        console.log("Indexes ensured");
      });
    })
    .catch((e: Error) => {
      console.error(`MongoDB Connection Error : ${e.message} `);
    });
}

export default connectDB;
