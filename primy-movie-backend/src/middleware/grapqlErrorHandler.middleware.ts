
import CustomError, {
  errorCodeEnum,
  isMongoDBError,
  MongoDBError,
} from "../utils/ErrorObject";
import { GraphQLErrorRespose } from "../utils/ApiResponse";

const devError = ({ error }: { error: CustomError }) => {

  
  throw new GraphQLErrorRespose({
    message: error.message,
    errorCode: error.errorCode,
    stacktrace: error.stack,
  });
};

const prodError = ({ err }: { err: CustomError }) => {
  if (err.isOperational) {
    throw new GraphQLErrorRespose({
      message: err.message,
      errorCode: err.errorCode,
    });
  } else {
    throw new GraphQLErrorRespose({
      message: "Somthing went wrong!",
      errorCode: errorCodeEnum.INTERNAL_SERVER_ERROR,
    });
  }
};

const duplicateKeyErrorHandler = (error: CustomError & MongoDBError) => {
  const value = Object.values(error.keyValue!);
  const key = Object.keys(error.keyValue!);

  throw new GraphQLErrorRespose({
    message: `There is already ${key} with "${value}" available in databse. Please use another ${key}!`,
    errorCode: errorCodeEnum.DUPLICATE_KEY,
  });
};

const typeCastErrorHandler = (err: CustomError & MongoDBError) => {


  throw new GraphQLErrorRespose({
    message: `the Id of the ${err.value} is invalid`,
    errorCode: errorCodeEnum.VALIDATION_ERROR,
  });
};

export const globaleGraphqlErrorHandler = (error: CustomError) => {


  


  if (process.env.NODE_ENV == undefined || process.env.NODE_ENV == "development") {
    console.log(process.env.NODE_ENV);

    devError({ error: error });
  } else if (process.env.NODE_ENV == "production") {
    if (isMongoDBError(error) && error.code === 11000) {  
      duplicateKeyErrorHandler(error);
    }
    if (isMongoDBError(error) && error.name === "CastError") {
      typeCastErrorHandler(error);
    }
    prodError({ err: error });
  }
};
