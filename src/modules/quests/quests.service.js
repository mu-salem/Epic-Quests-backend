import Quest from "../../DB/models/quest.model.js";
import Hero from "../../DB/models/hero.model.js";

export const getAllQuests = async (req, res, next) => {
  const { status, hero_id, priority } = req.query;
  const filter = { user: req.user._id };

  if (hero_id) filter.hero = hero_id;
  if (priority) filter.priority = priority;

  if (status === "active") filter.isCompleted = false;
  else if (status === "completed") filter.isCompleted = true;

  const quests = await Quest.find(filter).sort({ createdAt: -1 });

  return res.status(200).json({ success: true, quests });
};

export const getQuestById = async (req, res, next) => {
  const quest = await Quest.findOne({ _id: req.params.id, user: req.user._id });

  if (!quest) {
    return next(new Error("Quest not found", { cause: 404 }));
  }

  return res.status(200).json({ success: true, quest });
};

export const createQuest = async (req, res, next) => {
  const { hero, title, ...rest } = req.body;

  // Verify hero belongs to user
  const heroExists = await Hero.findOne({ _id: hero, user: req.user._id });
  if (!heroExists) {
    return next(new Error("Hero not found or unauthorized", { cause: 404 }));
  }

  const quest = await Quest.create({
    user: req.user._id,
    hero,
    title,
    ...rest,
  });

  // Increment totalQuests for the hero
  heroExists.totalQuests += 1;
  await heroExists.save();

  return res.status(201).json({ success: true, quest });
};

export const updateQuest = async (req, res, next) => {
  const quest = await Quest.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { ...req.body },
    { new: true, runValidators: true },
  );

  if (!quest) {
    return next(new Error("Quest not found or unauthorized", { cause: 404 }));
  }

  return res.status(200).json({ success: true, quest });
};

export const completeQuest = async (req, res, next) => {
  const quest = await Quest.findOne({ _id: req.params.id, user: req.user._id });

  if (!quest) {
    return next(new Error("Quest not found", { cause: 404 }));
  }
  if (quest.isCompleted) {
    return next(new Error("Quest is already completed", { cause: 400 }));
  }

  quest.isCompleted = true;
  quest.completedAt = new Date();
  await quest.save();

  // Grant XP to hero
  const hero = await Hero.findById(quest.hero);
  if (hero) {
    hero.xp += quest.rewardXp;
    hero.completedQuests += 1;
    hero.streak += 1;

    // Basic level up logic (every 1000 XP)
    if (hero.xp >= hero.level * 1000) {
      hero.level += 1;
    }

    await hero.save();
  }

  return res.status(200).json({ success: true, quest, hero });
};

export const uncompleteQuest = async (req, res, next) => {
  const quest = await Quest.findOne({ _id: req.params.id, user: req.user._id });

  if (!quest) {
    return next(new Error("Quest not found", { cause: 404 }));
  }
  if (!quest.isCompleted) {
    return next(new Error("Quest is not completed", { cause: 400 }));
  }

  quest.isCompleted = false;
  quest.completedAt = null;
  await quest.save();

  // Rollback XP from hero
  const hero = await Hero.findById(quest.hero);
  if (hero) {
    hero.xp = Math.max(0, hero.xp - quest.rewardXp);
    hero.completedQuests = Math.max(0, hero.completedQuests - 1);
    hero.streak = Math.max(0, hero.streak - 1);

    // Check if level needs to rollback
    if (hero.level > 1 && hero.xp < (hero.level - 1) * 1000) {
      hero.level -= 1;
    }

    await hero.save();
  }

  return res.status(200).json({ success: true, quest, hero });
};

export const deleteQuest = async (req, res, next) => {
  const quest = await Quest.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!quest) {
    return next(new Error("Quest not found or unauthorized", { cause: 404 }));
  }

  // Decrement totalQuests
  const hero = await Hero.findById(quest.hero);
  if (hero) {
    hero.totalQuests = Math.max(0, hero.totalQuests - 1);
    if (quest.isCompleted) {
      hero.completedQuests = Math.max(0, hero.completedQuests - 1);
      hero.xp = Math.max(0, hero.xp - quest.rewardXp);
      hero.streak = Math.max(0, hero.streak - 1);
    }
    await hero.save();
  }

  return res
    .status(200)
    .json({ success: true, message: "Quest deleted successfully" });
};
