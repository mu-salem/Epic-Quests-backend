import Hero from "../../DB/models/hero.model.js";
import User from "../../DB/models/user.model.js";
import Quest from "../../DB/models/quest.model.js";
import cloudinary from "../../utils/file uploading/cloudinary.config.js";

// Helper to fetch quests and attach to a hero document
const populateQuests = async (heroDoc) => {
  const quests = await Quest.find({ hero: heroDoc._id }).lean();
  return { ...heroDoc.toObject(), quests };
};

// Get all heroes for the current user
export const getAllHeroes = async (req, res, next) => {
  const heroesDocs = await Hero.find({ user: req.user._id });
  const heroes = await Promise.all(heroesDocs.map(populateQuests));

  return res.status(200).json({
    success: true,
    message: "Heroes retrieved successfully",
    heroes,
  });
};

// Get a specific hero
export const getHeroById = async (req, res, next) => {
  const { id } = req.params;

  const heroDoc = await Hero.findOne({ _id: id, user: req.user._id });
  if (!heroDoc) return next(new Error("Hero not found!", { cause: 404 }));

  const hero = await populateQuests(heroDoc);

  return res.status(200).json({
    success: true,
    message: "Hero retrieved successfully",
    hero,
  });
};

// Create a new hero
export const createHero = async (req, res, next) => {
  // Use destructuring to extract specific fields safely
  const { id, total_quests, completed_quests, ...restBody } = req.body;
  const payload = { ...restBody };

  payload.user = req.user._id;

  if (id) {
    if (id.length === 24) {
      payload._id = id;
    }
  }
  if (total_quests !== undefined) payload.totalQuests = total_quests;
  if (completed_quests !== undefined)
    payload.completedQuests = completed_quests;

  if (req.file) {
    const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
      folder: `${process.env.CLOUD_FOLDER_NAME}/users/${req.user._id}/heroes`,
    });
    payload.avatar = secure_url;
  } else if (!payload.avatar) {
    return next(new Error("Avatar is required"), { cause: 400 });
  }

  const heroDoc = await Hero.create(payload);
  const hero = { ...heroDoc.toObject(), quests: [] }; // Fresh hero has no quests

  return res.status(201).json({
    success: true,
    message: "Hero created successfully",
    hero,
  });
};

// Update hero
export const updateHero = async (req, res, next) => {
  const { id: heroId } = req.params;

  // Use destructuring to ignore id, user, avatar, and map total_quests/completed_quests
  const { id, user, avatar, total_quests, completed_quests, ...updates } =
    req.body;

  // Map offline-first frontend fields
  if (total_quests !== undefined) {
    updates.totalQuests = total_quests;
  }
  if (completed_quests !== undefined) {
    updates.completedQuests = completed_quests;
  }

  const heroDoc = await Hero.findOneAndUpdate(
    { _id: heroId, user: req.user._id },
    { $set: updates },
    { new: true }, // Return the updated document
  );

  if (!heroDoc)
    return next(new Error("Hero not found or unauthorized", { cause: 404 }));

  const hero = await populateQuests(heroDoc);

  return res.status(200).json({
    success: true,
    message: "Hero updated successfully",
    hero,
  });
};

// Delete a hero
export const deleteHero = async (req, res, next) => {
  const { id } = req.params;

  const hero = await Hero.findOneAndDelete({ _id: id, user: req.user._id });

  if (!hero)
    return next(new Error("Hero not found or unauthorized", { cause: 404 }));

  // Also delete all quests associated with this hero to clean up
  await Quest.deleteMany({ hero: hero._id });

  return res.status(200).json({
    success: true,
    message: "Hero deleted successfully",
  });
};

// Select active hero
export const selectHero = async (req, res, next) => {
  const { id } = req.params;

  // Verify hero exists and belongs to user
  const heroDoc = await Hero.findOne({ _id: id, user: req.user._id });
  if (!heroDoc) return next(new Error("Hero not found!", { cause: 404 }));

  const hero = await populateQuests(heroDoc);

  // We could implement an activeHero tracking on the User model
  // Or simply rely on the frontend to keep track, but returning success:
  return res.status(200).json({
    success: true,
    message: `Hero ${hero.name} selected successfully`,
    hero,
  });
};
