import { Response } from "express";
import { GraphQLError } from "graphql";
import { errorCodeEnum } from "./ErrorObject";

interface SendResponseParams {
  res: Response;
  statusCode: number;
  TotalPages?: number;
  length?: number;
  message: string;
  data?: any;
}
export const SendResponse = ({
  res,
  statusCode,
  length,
  TotalPages,
  message,
  data,
}: SendResponseParams) => {
  res.status(statusCode).json({
    statusCode: statusCode,
    length: length,
    TotalPages: TotalPages,
    message: message,
    data: data,
  });
};

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
