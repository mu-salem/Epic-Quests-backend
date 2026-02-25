import joi from "joi";

export const updateProfileSchema = joi
  .object({
    name: joi.string().min(2).max(50).required(),
  })
  .required();

export const updatePasswordSchema = joi
  .object({
    oldPassword: joi.string().required(),
    newPassword: joi.string().min(6).required(),
    confirmPassword: joi.string().valid(joi.ref("newPassword")).required(),
  })
  .required();
