import joi from "joi";
import { objectIdValidation } from "../../middleware/validation.middleware.js";

// Validation for Quests endpoints

export const getQuestsSchema = joi
  .object({
    status: joi.string().valid("active", "completed", "all").optional(),
    hero_id: joi.custom(objectIdValidation).optional(),
    priority: joi.string().valid("low", "medium", "high").optional(),
  })
  .required();

export const getQuestSchema = joi
  .object({
    id: joi.custom(objectIdValidation).required(),
  })
  .required();

export const createQuestSchema = joi
  .object({
    hero: joi.custom(objectIdValidation).required(),
    title: joi.string().min(2).max(100).required(),
    description: joi.string().allow("").optional(),
    priority: joi.string().valid("low", "medium", "high").optional(),
    rewardXp: joi.number().min(0).optional(),
    dueDate: joi.date().iso().optional(),
    isCompleted: joi.boolean().optional(),
    completedAt: joi.date().iso().optional(),
  })
  .required();

export const updateQuestSchema = joi
  .object({
    id: joi.custom(objectIdValidation).required(),
    title: joi.string().min(2).max(100).optional(),
    description: joi.string().allow("").optional(),
    priority: joi.string().valid("low", "medium", "high").optional(),
    rewardXp: joi.number().min(0).optional(),
    dueDate: joi.date().iso().optional(),
  })
  .required();

export const completeQuestSchema = joi
  .object({
    id: joi.custom(objectIdValidation).required(),
  })
  .required();

export const uncompleteQuestSchema = joi
  .object({
    id: joi.custom(objectIdValidation).required(),
  })
  .required();

export const deleteQuestSchema = joi
  .object({
    id: joi.custom(objectIdValidation).required(),
  })
  .required();
