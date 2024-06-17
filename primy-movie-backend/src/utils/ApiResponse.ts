import { Response } from "express";
import { GraphQLError } from "graphql";
import { errorCodeEnum } from "./ErrorObject";


export class GraphQLErrorRespose extends GraphQLError {
  constructor({
    message,
    errorCode,
    stacktrace,
  }: {
    message: string;
    errorCode: errorCodeEnum;
    stacktrace?: any;
  }) {
    super(message, { extensions: { code: errorCode, stacktrace: stacktrace } });
  }
}

// export { ApiResponse };
