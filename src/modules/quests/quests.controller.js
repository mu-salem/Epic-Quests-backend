import { Router } from "express";
import { asyncHandler } from "../../utils/error handling/asynchandler.js";
import validation from "../../middleware/validation.middleware.js";
import isAuthenticated from "../../middleware/authentication.middleware.js";
import * as questsScheme from "./quests.validation.js";
import * as questsService from "./quests.service.js";

const router = Router();

// Get all quests (supports query filters like ?status=active or ?hero_id=123)
router.get(
  "/",
  isAuthenticated,
  validation(questsScheme.getQuestsSchema),
  asyncHandler(questsService.getAllQuests),
);

// Get a specific quest
router.get(
  "/:id",
  isAuthenticated,
  validation(questsScheme.getQuestSchema),
  asyncHandler(questsService.getQuestById),
);

// Create a new quest
router.post(
  "/",
  isAuthenticated,
  validation(questsScheme.createQuestSchema),
  asyncHandler(questsService.createQuest),
);

// Update a quest
router.patch(
  "/:id",
  isAuthenticated,
  validation(questsScheme.updateQuestSchema),
  asyncHandler(questsService.updateQuest),
);

// Complete a quest (Grants XP)
router.patch(
  "/:id/complete",
  isAuthenticated,
  validation(questsScheme.completeQuestSchema),
  asyncHandler(questsService.completeQuest),
);

// Uncomplete a quest (Rolls back XP)
router.patch(
  "/:id/uncomplete",
  isAuthenticated,
  validation(questsScheme.uncompleteQuestSchema),
  asyncHandler(questsService.uncompleteQuest),
);

// Delete a quest
router.delete(
  "/:id",
  isAuthenticated,
  validation(questsScheme.deleteQuestSchema),
  asyncHandler(questsService.deleteQuest),
);

export default router;
