import Hero from "../../DB/models/hero.model.js";
import User from "../../DB/models/user.model.js";

// Get all heroes for the current user
export const getAllHeroes = async (req, res, next) => {
  const heroes = await Hero.find({ user: req.user._id });

  return res.status(200).json({
    success: true,
    message: "Heroes retrieved successfully",
    data: heroes,
  });
};

// Get a specific hero
export const getHeroById = async (req, res, next) => {
  const { id } = req.params;

  const hero = await Hero.findOne({ _id: id, user: req.user._id });
  if (!hero) return next(new Error("Hero not found!", { cause: 404 }));

  return res.status(200).json({
    success: true,
    message: "Hero retrieved successfully",
    data: hero,
  });
};

// Create a new hero
export const createHero = async (req, res, next) => {
  const { name, avatar } = req.body;

  const hero = await Hero.create({
    user: req.user._id,
    name,
    avatar,
  });

  return res.status(201).json({
    success: true,
    message: "Hero created successfully",
    data: hero,
  });
};

// Update hero
export const updateHero = async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  // Don't allow changing the id or user reference
  delete updates.id;
  delete updates.user;

  const hero = await Hero.findOneAndUpdate(
    { _id: id, user: req.user._id },
    { $set: updates },
    { new: true }, // Return the updated document
  );

  if (!hero)
    return next(new Error("Hero not found or unauthorized", { cause: 404 }));

  return res.status(200).json({
    success: true,
    message: "Hero updated successfully",
    data: hero,
  });
};

// Delete a hero
export const deleteHero = async (req, res, next) => {
  const { id } = req.params;

  const hero = await Hero.findOneAndDelete({ _id: id, user: req.user._id });

  if (!hero)
    return next(new Error("Hero not found or unauthorized", { cause: 404 }));

  return res.status(200).json({
    success: true,
    message: "Hero deleted successfully",
  });
};

// Select active hero
export const selectHero = async (req, res, next) => {
  const { id } = req.params;

  // Verify hero exists and belongs to user
  const hero = await Hero.findOne({ _id: id, user: req.user._id });
  if (!hero) return next(new Error("Hero not found!", { cause: 404 }));

  // We could implement an activeHero tracking on the User model
  // Or simply rely on the frontend to keep track, but returning success:
  return res.status(200).json({
    success: true,
    message: `Hero ${hero.name} selected successfully`,
    data: hero,
  });
};
