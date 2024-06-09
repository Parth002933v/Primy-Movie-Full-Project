import { Document, model, Schema } from "mongoose";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

interface IAdmin extends Document {
  email: string;
  password: string;
  isPasswordCorrect(password: string): Promise<boolean>;
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

const AdminModel = model<IAdmin>("admin", adminSchema);

export { IAdmin, AdminModel };
