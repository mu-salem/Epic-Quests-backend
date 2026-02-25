import { model, Schema } from "mongoose";

const recurringQuestSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    hero: { type: Schema.Types.ObjectId, ref: "Hero", required: true },
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    recurrenceType: { type: String, enum: ["daily", "weekly", "monthly"], required: true },
    nextDueAt: { type: Date, required: true }
  },
  { timestamps: true }
);

const RecurringQuest = model("RecurringQuest", recurringQuestSchema);
export default RecurringQuest;
