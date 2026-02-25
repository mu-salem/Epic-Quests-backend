import { Router } from "express";
import { asyncHandler } from "../../utils/error handling/asynchandler.js";
import validation from "../../middleware/validation.middleware.js";
import isAuthenticated from "../../middleware/authentication.middleware.js";
import * as recurringQuestsScheme from "./recurringQuests.validation.js";
import * as recurringQuestsService from "./recurringQuests.service.js";

const router = Router();

// Get all recurring quests
router.get(
  "/",
  isAuthenticated,
  validation(recurringQuestsScheme.getRecurringQuestsSchema),
  asyncHandler(recurringQuestsService.getAllRecurringQuests),
);

// Get specific recurring quest
router.get(
  "/:id",
  isAuthenticated,
  validation(recurringQuestsScheme.getRecurringQuestSchema),
  asyncHandler(recurringQuestsService.getRecurringQuestById),
);

// Create recurring quest template
router.post(
  "/",
  isAuthenticated,
  validation(recurringQuestsScheme.createRecurringQuestSchema),
  asyncHandler(recurringQuestsService.createRecurringQuest),
);

// Update recurring quest template
router.patch(
  "/:id",
  isAuthenticated,
  validation(recurringQuestsScheme.updateRecurringQuestSchema),
  asyncHandler(recurringQuestsService.updateRecurringQuest),
);

// Delete recurring quest template
router.delete(
  "/:id",
  isAuthenticated,
  validation(recurringQuestsScheme.deleteRecurringQuestSchema),
  asyncHandler(recurringQuestsService.deleteRecurringQuest),
);

export default router;
