import { Router } from "express";
import { asyncHandler } from "../../utils/error handling/asynchandler.js";
import validation from "../../middleware/validation.middleware.js";
import isAuthenticated from "../../middleware/authentication.middleware.js";
import * as heroesScheme from "./heroes.validation.js";
import * as heroesService from "./heroes.service.js";

const router = Router();

// Get all heroes for the current user
router.get("/", isAuthenticated, asyncHandler(heroesService.getAllHeroes));

// Get a specific hero
router.get(
  "/:id",
  isAuthenticated,
  validation(heroesScheme.getHeroSchema),
  asyncHandler(heroesService.getHeroById),
);

// Create a new hero
router.post(
  "/",
  isAuthenticated,
  validation(heroesScheme.createHeroSchema),
  asyncHandler(heroesService.createHero),
);

// Update hero (xp, level, streak, etc)
router.patch(
  "/:id",
  isAuthenticated,
  validation(heroesScheme.updateHeroSchema),
  asyncHandler(heroesService.updateHero),
);

// Delete a hero
router.delete(
  "/:id",
  isAuthenticated,
  validation(heroesScheme.deleteHeroSchema),
  asyncHandler(heroesService.deleteHero),
);

// Select active hero
router.post(
  "/:id/select",
  isAuthenticated,
  validation(heroesScheme.selectHeroSchema),
  asyncHandler(heroesService.selectHero),
);

export default router;
