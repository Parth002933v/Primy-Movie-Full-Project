import { Document, model, Schema } from "mongoose";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { getSSMParam } from "../utils/secrets";

interface IAdmin extends Document {
  email: string;
  password: string;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): Promise<string>;
}

const adminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: { type: String, required: [true, "password is required"] },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (this: IAdmin, next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

adminSchema.methods.isPasswordCorrect = async function (
  this: IAdmin,
  password: string
) {
  return await bcrypt.compare(password, this.password);
};


adminSchema.methods.generateAccessToken = async function (this: IAdmin): Promise<string> {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    `${await getSSMParam({ name: "/primy-movie-backend/prod/access-token-secret" })}}`,
    {
      expiresIn: `${process.env.ACCESS_TOKEN_EXPIRY}`,
    }
  );
};


const AdminModel = model<IAdmin>("admin", adminSchema);

export { IAdmin, AdminModel };
