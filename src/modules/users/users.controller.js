import { Router } from "express";
import { asyncHandler } from "../../utils/error handling/asynchandler.js";
import validation from "../../middleware/validation.middleware.js";
import isAuthenticated from "../../middleware/authentication.middleware.js";
import * as usersScheme from "./users.validation.js";
import * as usersService from "./users.service.js";

const router = Router();

// Get current user profile
router.get("/profile", isAuthenticated, asyncHandler(usersService.getProfile));

// Update user profile (name, etc)
router.patch(
  "/profile",
  isAuthenticated,
  validation(usersScheme.updateProfileSchema),
  asyncHandler(usersService.updateProfile),
);

// Update user password
router.patch(
  "/update-password",
  isAuthenticated,
  validation(usersScheme.updatePasswordSchema),
  asyncHandler(usersService.updatePassword),
);

export default router;
