import passport from "passport";
import AdminService, { createAdminPayload } from "../../service/admin";
import { asyncResolverHandler } from "../../utils/asyncHandler";
import CustomError, { errorCodeEnum } from "../../utils/ErrorObject";
import { Request, Response } from "express";
import { promisify } from 'util';
import { IAdmin } from "../../model/admin_model";

import { Request as ExpressRequest } from 'express';

export type MyUser = {
  firstName: string;
  lastName: string;
}
export interface MyContext extends PassportContext<any, ExpressRequest> { }




import { PassportContext } from 'graphql-passport';


export const adminResolver = {
  Query: {
    hy: () => "hellow"
  },

  Mutation: {

    adminSignIn: asyncResolverHandler(
      async (_: any, { input }: { input: { password: string } }, context: PassportContext<any, any>) => {

        const password = input.password

        const email = "email"

        const { user: admin }: { user: IAdmin } = await context.authenticate("graphql-local", { _, password });

        await context.login(admin)

        return admin.email;
      }
    ),


    adminSignUp: asyncResolverHandler(
      async (_: any, args: createAdminPayload, context: any, info: any) => {
        const res = await AdminService.createAdmin(args);
        return {
          _id: res?._id,
          email: res?.email,
        };
      }
    ),

  },
};




