import { Request, Response, NextFunction } from "express";
import CustomError from "./ErrorObject";

import { globaleGraphqlErrorHandler } from "../middleware/grapqlErrorHandler.middleware";

export const asyncHandler = (
  func: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((err: CustomError) => {});
  };
};

// Error handling function
export const asyncResolverHandler =
  (resolver: any) =>
  async (parent: any, args: any, context: any, info: any) => {
    try {
      return await resolver(parent, args, context, info);
    } catch (err: any) {      
      globaleGraphqlErrorHandler(err);
    }
  };
