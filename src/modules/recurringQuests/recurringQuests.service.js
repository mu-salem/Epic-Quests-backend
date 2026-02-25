import RecurringQuest from "../../DB/models/recurringQuest.model.js";
import Hero from "../../DB/models/hero.model.js";

// Fetch all recurring quests for a given hero
export const getAllRecurringQuests = async (req, res, next) => {
  const { hero_id } = req.query;

  const recurringQuests = await RecurringQuest.find({ hero: hero_id });

  return res.status(200).json({ success: true, recurringQuests });
};

// Create a new recurring quest
export const createRecurringQuest = async (req, res, next) => {
  const recurringQuestData = req.body;

  // Set the user logic
  recurringQuestData.user = req.user._id;
  // Map the frontend string ID to the mongoose _id
  recurringQuestData._id = recurringQuestData.id;

  const hero = await Hero.findById(recurringQuestData.hero);
  if (!hero) {
    return next(new Error("Hero not found", { cause: 404 }));
  }

  // Ensure this user owns this hero
  if (hero.user.toString() !== req.user._id.toString()) {
    return next(
      new Error("You do not have permission to add quests to this hero", {
        cause: 403,
      }),
    );
  }

  const recurringQuest = await RecurringQuest.create(recurringQuestData);

  // Bind to hero's recurringQuests array (avoid duplicates if they already sent multiple requests)
  if (!hero.recurringQuests.includes(recurringQuest._id)) {
    hero.recurringQuests.push(recurringQuest._id);
    await hero.save();
  }

  return res.status(201).json({ success: true, recurringQuest });
};

// Update an existing recurring quest
export const updateRecurringQuest = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  const recurringQuest = await RecurringQuest.findById(id);

  if (!recurringQuest) {
    return next(new Error("Recurring Quest not found", { cause: 404 }));
  }

  if (recurringQuest.user.toString() !== req.user._id.toString()) {
    return next(
      new Error("You do not have permission to update this recurring quest", {
        cause: 403,
      }),
    );
  }

  // Exclude non-updateable fields
  delete updateData.id;
  delete updateData.hero;
  delete updateData.user;
  delete updateData._id;

  const updatedRecurringQuest = await RecurringQuest.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true },
  );

  return res
    .status(200)
    .json({ success: true, recurringQuest: updatedRecurringQuest });
};

// Delete a recurring quest
export const deleteRecurringQuest = async (req, res, next) => {
  const { id } = req.params;

  const recurringQuest = await RecurringQuest.findById(id);

  if (!recurringQuest) {
    return next(new Error("Recurring Quest not found", { cause: 404 }));
  }

  if (recurringQuest.user.toString() !== req.user._id.toString()) {
    return next(
      new Error("You do not have permission to delete this recurring quest", {
        cause: 403,
      }),
    );
  }

  await RecurringQuest.findByIdAndDelete(id);

  // Remove from Hero's recurringQuests array
  await Hero.findByIdAndUpdate(recurringQuest.hero, {
    $pull: { recurringQuests: id },
  });

  return res
    .status(200)
    .json({ success: true, message: "Recurring Quest deleted successfully" });
};
