import joi from "joi";

export const registerSchema = joi
  .object({
    name: joi.string().min(2).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required(),
  })
  .required();

export const loginSchema = joi
  .object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  })
  .required();

export const verifyEmailSchema = joi
  .object({
    email: joi.string().email().required(),
    code: joi.string().length(6).required(),
  })
  .required();

export const forgotPasswordSchema = joi
  .object({
    email: joi.string().email().required(),
  })
  .required();

export const verifyResetCodeSchema = joi
  .object({
    email: joi.string().email().required(),
    code: joi.string().length(6).required(),
  })
  .required();

export const resetPasswordSchema = joi
  .object({
    email: joi.string().email().required(),
    newPassword: joi.string().min(6).required(),
  })
  .required();

export const refreshToken = joi
  .object({
    token: joi.string().required(),
  })
  .required();
