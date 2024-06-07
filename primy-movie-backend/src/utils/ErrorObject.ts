export enum errorCodeEnum {
  GRAPHQL_PARSE_FAILED = "GRAPHQL_PARSE_FAILED",
  GRAPHQL_VALIDATION_FAILED = "GRAPHQL_VALIDATION_FAILED",
  BAD_USER_INPUT = "BAD_USER_INPUT",
  PERSISTED_QUERY_NOT_FOUND = "PERSISTED_QUERY_NOT_FOUND",
  PERSISTED_QUERY_NOT_SUPPORTED = "PERSISTED_QUERY_NOT_SUPPORTED",
  OPERATION_RESOLUTION_FAILURE = "OPERATION_RESOLUTION_FAILURE",
  BAD_REQUEST = "BAD_REQUEST",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  UNAUTHENTICATED = "UNAUTHENTICATED",
  FORBIDDEN = "FORBIDDEN",
  DUPLICATE_KEY = "DUPLICATE_KEY",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  NOT_FOUND = 'NOT_FOUND',
}

interface CustomErrorParams {
  message: string;
  errorCode: errorCodeEnum ;
}

export default class CustomError extends Error {
  errorCode: errorCodeEnum ;
  isOperational?: boolean;

  constructor({
    message,
    errorCode = errorCodeEnum.INTERNAL_SERVER_ERROR,
  }: CustomErrorParams) {
    super(message);

    this.errorCode = errorCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Define a MongoDBError interface
export interface MongoDBError extends Error {
  code: number;
  value: string;
  keyPattern?: Record<string, any>;
  keyValue?: Record<string, any>;
}

// Function to check if an error is a MongoDB error
export function isMongoDBError(error: any): error is MongoDBError {
  return typeof error.code === "number" || error.name === "CastError";
}
