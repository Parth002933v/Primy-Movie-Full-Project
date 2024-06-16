import AdminService, { createAdminPayload } from "../../service/admin";
import { asyncResolverHandler } from "../../utils/asyncHandler";

import { ExpressContextFunctionArgument } from "@apollo/server/express4";
import CustomError, { errorCodeEnum } from "../../utils/ErrorObject";
import { AdminModel } from "../../model/admin_model";


export const adminResolver = {
  Query: {
    hello: () => 'world',

    getAdmin: asyncResolverHandler(async (parent: any, arg: any, content: ExpressContextFunctionArgument) => {

      if (content.req.isUnauthenticated()) {
        throw new CustomError({ errorCode: errorCodeEnum.UNAUTHENTICATED, message: "You're not authorised to perform this operation" })

      }


      const admin = await AdminModel.findById(content.req.user)

      if (!admin) {
        throw new CustomError({ errorCode: errorCodeEnum.UNAUTHENTICATED, message: "You're not authorised to perform this operation" })
      }

      return `${admin.email}`

    })

  },

  Mutation: {

    adminSignIn: asyncResolverHandler(
      async (_: any, { input }: { input: { password: string } }, context: ExpressContextFunctionArgument) => {

        const { accessToken } = await AdminService.siginAdmin({ password: input.password })

        const options = {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
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




