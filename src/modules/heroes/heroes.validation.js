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
    name: joi.string().min(2).max(50).required(),
    avatar: joi.string().required(),
  })
  .required();

export const updateHeroSchema = joi
  .object({
    id: joi.string().custom(objectIdValidation).required(),
    name: joi.string().min(2).max(50),
    avatar: joi.string(),
    level: joi.number().integer().min(1),
    xp: joi.number().min(0),
    totalQuests: joi.number().integer().min(0),
    completedQuests: joi.number().integer().min(0),
    streak: joi.number().integer().min(0),
  })
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
