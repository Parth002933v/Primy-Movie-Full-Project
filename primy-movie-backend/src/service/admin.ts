import { AdminModel, IAdmin } from "../model/admin_model";
import CustomError, { errorCodeEnum } from "../utils/ErrorObject";
import { getSSMParam } from "../utils/secrets";

export interface createAdminPayload {
  input: { email: string; password: string };
}

export interface signInAdminPayload {
  input: { password: string };
}
class AdminService {

  public static async createAdmin(payload: createAdminPayload) {
    const { email, password } = payload.input;

    const newUser = await AdminModel.create({
      email: email,
      password: password,
    });

    const userCreated = await AdminModel.findById(newUser._id);

    return userCreated;
  }


  private static async GenerateAccessAndRefreshToken(admin: IAdmin) {

    const accessToken = await admin.generateAccessToken();
    // const refreshToken = admin.GenerateRefreshToken();

    // admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });

    return { accessToken };

  }


  public static async siginAdmin({ password }: { password: string }) {
    const admin = await AdminModel.findById(await getSSMParam({ name: "/primy-movie-backend/prod/admin-id" }));

    if (!admin) {
      throw new CustomError({
        errorCode: errorCodeEnum.NOT_FOUND,
        message: "No admin found. Please register first",
      });
    }
    const isPasswordValid = await admin.isPasswordCorrect(password);

    if (isPasswordValid == false) {
      throw new CustomError({
        errorCode: errorCodeEnum.UNAUTHENTICATED,
        message: "Invalid user credentials",
      });
    }


    const { accessToken } = await AdminService.GenerateAccessAndRefreshToken(admin)

    return { accessToken }
  }
}

export default AdminService;
