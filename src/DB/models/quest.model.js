import { model, Schema } from "mongoose";

const questSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    hero: { type: Schema.Types.ObjectId, ref: "Hero", required: true },
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    isCompleted: { type: Boolean, default: false },
    rewardXp: { type: Number, default: 25 },
    dueDate: { type: Date },
    completedAt: { type: Date }
  },
  { timestamps: true }
);

const Quest = model("Quest", questSchema);
export default Quest;
