import { Router } from "express";
import { asyncHandler } from "../../utils/error handling/asynchandler.js";
import validation from "../../middleware/validation.middleware.js";
import * as authScheme from "./auth.validation.js";
import * as authService from "./auth.service.js";

const router = Router();

router.post(
  "/register",
  validation(authScheme.registerSchema),
  asyncHandler(authService.register),
);

// Login existing user
router.post(
  "/login",
  validation(authScheme.loginSchema),
  asyncHandler(authService.login),
);

// Verify Email
router.post(
  "/verify-email",
  validation(authScheme.verifyEmailSchema),
  asyncHandler(authService.verifyEmail),
);

// Request password reset
router.post(
  "/forgot-password",
  validation(authScheme.forgotPasswordSchema),
  asyncHandler(authService.forgotPassword),
);

// Verify reset code
router.post(
  "/verify-reset-code",
  validation(authScheme.verifyResetCodeSchema),
  asyncHandler(authService.verifyResetCode),
);

// Reset password
router.patch(
  "/reset-password",
  validation(authScheme.resetPasswordSchema),
  asyncHandler(authService.resetPassword),
);

// Refresh token
router.post(
  "/refresh-token",
  validation(authScheme.refreshToken),
  asyncHandler(authService.refreshToken)
);

export default router;
