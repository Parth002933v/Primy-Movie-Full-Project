import passport from "passport"
import { AdminModel } from "../model/admin_model";
import { GraphQLLocalStrategy, buildContext } from "graphql-passport";
import CustomError, { errorCodeEnum } from "../utils/ErrorObject";
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptionsWithoutRequest } from "passport-jwt"

export function passportConfiguration() {


    const options: StrategyOptionsWithoutRequest = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: `${process.env.JWT_SECRET}`
    }


    passport.use(new JwtStrategy(options, async function (jwt_payload, done) {
        try {

            console.log(jwt_payload._id, "============ passportConfiguration ===============");

            const admin = await AdminModel.findById(jwt_payload._id)

            if (!admin) {
                throw new CustomError({ message: "No admin found. Please register first", errorCode: errorCodeEnum.NOT_FOUND })
            }

            done(null, admin)


        } catch (error: any) {
            console.log("============ passportConfiguration error ===============");


            done("error.message", false)
        }

    }))



    // passport.use(new GraphQLLocalStrategy(async (_, password, done) => {
    //     console.log("GraphQLLocalStrategy...", password);

    //     try {
    //         if (!password) {
    //             throw new CustomError({ message: "Password is Required", errorCode: errorCodeEnum.VALIDATION_ERROR })
    //         }
    //         const admin = await AdminModel.findById(process.env.ADMIN_ID);

    //         if (!admin) {
    //             throw new CustomError({ message: "No admin found. Please register first", errorCode: errorCodeEnum.NOT_FOUND });
    //         }
    //         const isPasswordValid = await admin.isPasswordCorrect(String(password));

    //         if (isPasswordValid == false) {
    //             throw new CustomError({ message: "Incorrect Password", errorCode: errorCodeEnum.INVALID_CREDENTIAL })

    //         }

    //         return done(null, admin)
    //     } catch (err: CustomError | any) {
    //         return done(err, null)
    //     }
    // }
    // )
    // )


    // passport.serializeUser((user: any, done) => {
    //     console.log("serializeUser...", user);


    //     done(null, user._id)
    // })
    // passport.deserializeUser(async (id, done) => {

    //     console.log("deserializeUser....", id);

    //     try {

    //         const admin = await AdminModel.findById(id)
    //         done(null, admin)
    //     } catch (error) {

    //         done(error)

    //     }
    // })


}