import { model, Schema } from "mongoose";

const heroSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String },
    gender: { type: String, enum: ["male", "female"], default: "male" },
    avatar: { type: String, required: true },
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    totalQuests: { type: Number, default: 0 },
    completedQuests: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Hero = model("Hero", heroSchema);
export default Hero;
