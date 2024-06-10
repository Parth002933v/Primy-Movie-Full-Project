import AdminService, { createAdminPayload } from "../../service/admin";
import { asyncResolverHandler } from "../../utils/asyncHandler";
import { IAdmin } from "../../model/admin_model";
import { PassportContext } from 'graphql-passport';


export const adminResolver = {
  Query: {
    hy: () => "hellow"
  },

  Mutation: {

    adminSignIn: asyncResolverHandler(
      async (_: any, { input }: { input: { password: string } }, context: PassportContext<any, any>) => {

        const password = input.password
        
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




