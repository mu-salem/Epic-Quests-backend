import User from "../../DB/models/user.model.js";
import { hash, compareHash } from "../../utils/hashing/hash.js";
import { generateToken, verifyToken } from "../../utils/token/token.js";
import randomstring from "randomstring";

const generateOTP = () =>
  randomstring.generate({ length: 6, charset: "numeric" });

// Register a new user
export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new Error("Email already registered"), { cause: 409 });
  }

  const hashedPassword = hash({ plainText: password });
  const activationCode = generateOTP();

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    activationCode,
  });

  eventEmitter.emit("verifyEmail", email, activationCode, "Verify Your Email");

  return res.status(201).json({
    success: true,
    message: "Registration successful. Please verify your email.",
  });
};

// Login existing user
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new Error("Invalid email or password"), { cause: 400 });
  }

  const isMatch = compareHash({ plainText: password, hash: user.password });
  if (!isMatch) {
    return next(new Error("Invalid email or password"), { cause: 400 });
  }

  if (!user.isEmailVerified) {
    return next(new Error("Please verify your email before logging in"), {
      cause: 403,
    });
  }

  // Generate tokens
  const accessToken = generateToken({
    payload: { id: user._id, role: user.role },
    options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE },
  });
  const refreshToken = generateToken({
    payload: { id: user._id, role: user.role },
    options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE },
  });

  user.isLoggedIn = true;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Login successful",
    tokens: { access_token: accessToken, refresh_token: refreshToken },
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      lastSelectedHero: user.lastSelectedHero,
    },
  });
};

// Verify Email
export const verifyEmail = async (req, res, next) => {
  const { email, code } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new Error("User not found"), { cause: 404 });
  }

  if (user.activationCode !== code) {
    return next(new Error("Invalid verification code"), { cause: 400 });
  }

  user.isEmailVerified = true;
  user.activationCode = undefined;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Email verified successfully",
  });
};

// Request password reset
export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new Error("User not found"), { cause: 404 });
  }

  const forgotPasswordCode = generateOTP();
  user.forgotPasswordCode = forgotPasswordCode;
  await user.save();

  eventEmitter.emit("forgotPassword", email, forgotPasswordCode);

  return res.status(200).json({
    success: true,
    message: "Password reset code sent to your email",
  });
};

// Verify reset code
export const verifyResetCode = async (req, res, next) => {
  const { email, code } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new Error("User not found"), { cause: 404 });
  }

  if (user.forgotPasswordCode !== code) {
    return next(new Error("Invalid reset code"), { cause: 400 });
  }

  return res.status(200).json({
    success: true,
    message: "Code verified. You can now reset your password.",
  });
};

// Reset password
export const resetPassword = async (req, res, next) => {
  const { email, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new Error("User not found"), { cause: 404 });
  }

  // Hash new password
  const hashedPassword = hash({ plainText: newPassword });
  user.password = hashedPassword;
  user.forgotPasswordCode = undefined; // Clear the code after use
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
};

// Refresh token
export const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  const payload = verifyToken({ token: refreshToken });
  if (!payload)
    return next(new Error("Invalid refresh token!", { cause: 401 }));

  const user = await User.findById(payload.id);
  if (!user) return next(new Error("User not found!", { cause: 404 }));

  const accessToken = generateToken({
    payload: { id: user._id, role: user.role },
    options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE },
  });

  const newRefreshToken = generateToken({
    payload: { id: user._id, role: user.role },
    options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE },
  });

  return res.status(200).json({
    success: true,
    message: "Token refreshed successfully",
    tokens: { access_token: accessToken, refresh_token: newRefreshToken },
  });
};
