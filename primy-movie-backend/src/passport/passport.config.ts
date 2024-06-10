import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import bcrypt from "bcrypt"
import { AdminModel } from "../model/admin_model";
import { GraphQLLocalStrategy, buildContext } from "graphql-passport";
import CustomError, { errorCodeEnum } from "../utils/ErrorObject";
import { globaleGraphqlErrorHandler } from "../middleware/grapqlErrorHandler.middleware";
import { GraphQLErrorRespose } from "../utils/ApiResponse";


export function passportConfiguration() {

    passport.use(new GraphQLLocalStrategy(async (_, password, done) => {
        console.log("GraphQLLocalStrategy...", password);

        try {
            if (!password) {
                throw new CustomError({ message: "Password is Required", errorCode: errorCodeEnum.VALIDATION_ERROR })
            }
            const admin = await AdminModel.findById(process.env.ADMIN_ID);

            if (!admin) {
                throw new CustomError({ message: "No admin found. Please register first", errorCode: errorCodeEnum.NOT_FOUND });
            }
            const isPasswordValid = await admin.isPasswordCorrect(String(password));

            if (isPasswordValid == false) {
                throw new CustomError({ message: "Incorrect Password", errorCode: errorCodeEnum.INVALID_CREDENTIAL })

            }

            return done(null, admin)
        } catch (err: CustomError | any) {
            return done(err, null)
        }
    }
    )
    )


    passport.serializeUser((user: any, done) => {
        console.log("serializeUser...", user);


        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {

        console.log("deserializeUser....", id);

        try {

            const admin = await AdminModel.findById(id)
            done(null, admin)
        } catch (error) {

            done(error)

        }
    })


}