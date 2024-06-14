import AdminService, { createAdminPayload } from "../../service/admin";
import { asyncResolverHandler } from "../../utils/asyncHandler";

import { ExpressContextFunctionArgument } from "@apollo/server/express4";


export const adminResolver = {
  Query: {
    hy: asyncResolverHandler(async (parent: any, arg: any, content: ExpressContextFunctionArgument) => {


      return `${content.req.user}`
    })
  },

  Mutation: {

    adminSignIn: asyncResolverHandler(
      async (_: any, { input }: { input: { password: string } }, context: ExpressContextFunctionArgument) => {

        const { accessToken } = await AdminService.siginAdmin({ password: input.password })

        const options = {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Set to true in production
        };


        context.res.cookie("accessToken", accessToken, options)

        return `${accessToken}`

        // const password = input.passwordc

        // const { user: admin }: { user: IAdmin } = await context.authenticate("graphql-local", { _, password });

        // await context.login(admin)

        // return admin.email;
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




