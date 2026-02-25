import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["User", "Admin"], default: "User" },
    isLoggedIn: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    activationCode: { type: String },
    forgotPasswordCode: { type: String },
    lastSelectedHero: { type: Schema.Types.ObjectId, ref: "Hero" },
  },
  { timestamps: true },
);

const User = model("User", userSchema);
export default User;
