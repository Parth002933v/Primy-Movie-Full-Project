import AdminService, { createAdminPayload } from "../../service/admin";
import { asyncResolverHandler } from "../../utils/asyncHandler";

export const adminResolver = {
  Query: {
    hy: () => "hellow",
  },

  Mutation: {
    adminSignUp: asyncResolverHandler(
      async (_: any, args: createAdminPayload, context: any, info: any) => {
        const res = await AdminService.createAdmin(args);
        return {
          _id: res?._id,
          email: res?.email,
        };
      }
    ),
    adminSignIn: asyncResolverHandler(
      async (_: any, args: createAdminPayload, context: any, info: any) => {
        return "ppppp";
      }
    ),
  },
};
