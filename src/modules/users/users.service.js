import User from "../../DB/models/user.model.js";
import { compareHash, hash } from "../../utils/hashing/hash.js";

// Get user profile
export const getProfile = async (req, res, next) => {
  const user = await User.findById(req.user._id).select(
    "-password -activationCode -forgotPasswordCode -__v",
  );

  if (!user) {
    return next(new Error("User not found", { cause: 404 }));
  }

  return res.status(200).json({ success: true, user });
};

// Update user profile
export const updateProfile = async (req, res, next) => {
  const { name } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name },
    { new: true, runValidators: true },
  ).select("-password -activationCode -forgotPasswordCode -__v");

  if (!user) {
    return next(new Error("User not found", { cause: 404 }));
  }

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
};

// Update user password
export const updatePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new Error("User not found", { cause: 404 }));
  }

  const isMatch = compareHash({ plainText: oldPassword, hash: user.password });
  if (!isMatch) {
    return next(new Error("Incorrect old password", { cause: 400 }));
  }

  const hashedPassword = hash({ plainText: newPassword });
  user.password = hashedPassword;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
};
