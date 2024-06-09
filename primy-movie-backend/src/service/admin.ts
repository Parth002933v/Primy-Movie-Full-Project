import { AdminModel } from "../model/admin_model";
import CustomError, { errorCodeEnum } from "../utils/ErrorObject";

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

  public static async siginAdmin(payload: signInAdminPayload) {
    const userExist = await AdminModel.findById(process.env.ADMIN_ID);

    if (!userExist) {
      throw new CustomError({
        errorCode: errorCodeEnum.NOT_FOUND,
        message: "No admin found. Please register first",
      });
    }
    const isPasswordValid = await userExist.isPasswordCorrect(
      payload.input.password
    );

    if (isPasswordValid == false) {
      throw new CustomError({
        errorCode: errorCodeEnum.UNAUTHENTICATED,
        message: "Invalid user credentials",
      });
    }
  }
}

export default AdminService;
