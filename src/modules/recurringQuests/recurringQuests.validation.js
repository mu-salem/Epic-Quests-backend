import joi from "joi";
import { isValidObjectId } from "../../middleware/validation.middleware.js";

// Validation for creating a new recurring quest
export const createRecurringQuestSchema = joi
  .object({
    id: joi.string().required(), // Accept string id from flutter
    hero: joi.custom(isValidObjectId).required(),
    title: joi.string().required(),
    description: joi.string().allow("", null).optional(),
    priority: joi
      .string()
      .valid("low", "medium", "high")
      .default("medium")
      .optional(),
    recurrenceType: joi.string().valid("daily", "weekly", "monthly").required(),
    nextDueAt: joi.date().required(),
  })
  .required();

// Validation for updating an existing recurring quest
export const updateRecurringQuestSchema = joi
  .object({
    id: joi.string().required(), // ID in params
    title: joi.string().optional(),
    description: joi.string().allow("", null).optional(),
    priority: joi.string().valid("low", "medium", "high").optional(),
    recurrenceType: joi.string().valid("daily", "weekly", "monthly").optional(),
    nextDueAt: joi.date().optional(),
  })
  .min(2) // At least id + one field to update
  .required();

// Validation for getting recurring quests (by hero)
export const getRecurringQuestSchema = joi
  .object({
    hero_id: joi.custom(isValidObjectId).required(), // Hero ID must be valid ObjectId from backend perspective
  })
  .required();

// Validation for deleting a recurring quest
export const deleteRecurringQuestSchema = joi
  .object({
    id: joi.string().required(), // Offline String ID
  })
  .required();
