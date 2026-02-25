import joi from "joi";
import { Types } from "mongoose";

const objectIdValidation = (value, helper) => {
  return Types.ObjectId.isValid(value) ? true : helper.message("Invalid Id");
};

export const getHeroSchema = joi
  .object({
    id: joi.string().custom(objectIdValidation).required(),
  })
  .required();

export const createHeroSchema = joi
  .object({
    id: joi.string(),
    name: joi.string().min(2).max(50).required(),
    description: joi.string().allow(""),
    gender: joi.string().valid("male", "female"),
    avatar: joi.string(),
    level: joi.number().integer().min(1),
    xp: joi.number().min(0),
    total_quests: joi.number().integer().min(0),
    completed_quests: joi.number().integer().min(0),
    streak: joi.number().integer().min(0),
  })
  .unknown(true)
  .required();

export const updateHeroSchema = joi
  .object({
    id: joi.string().custom(objectIdValidation).required(),
    name: joi.string().min(2).max(50),
    description: joi.string(),
    level: joi.number().integer().min(1),
    xp: joi.number().min(0),
    total_quests: joi.number().integer().min(0),
    completed_quests: joi.number().integer().min(0),
    streak: joi.number().integer().min(0),
  })
  .unknown(true)
  .required();

export const deleteHeroSchema = joi
  .object({
    id: joi.string().custom(objectIdValidation).required(),
  })
  .required();

export const selectHeroSchema = joi
  .object({
    id: joi.string().custom(objectIdValidation).required(),
  })
  .required();
