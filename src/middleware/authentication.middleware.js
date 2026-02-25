import User from "../DB/models/user.model.js";
import { asyncHandler } from "../utils/error handling/asynchandler.js";
import { verifyToken } from "../utils/token/token.js";

const isAuthenticated = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return next(new Error("Token is required!"), { cause: 403 });
  if (!authorization.toLowerCase().startsWith("bearer"))
    return next(new Error("Invalid token format! Use 'Bearer <token>'"), {
      cause: 403,
    });

  // Clean up the token (remove "Bearer", spaces, and accidental quotes)
  console.log("=== AUTH DEBUG: ORIGINAL HEADER ===", authorization);
  let Token = authorization.replace(/^(Bearer\s+)+/i, "").trim();
  Token = Token.replace(/^"+|"+$/g, "");
  console.log("=== AUTH DEBUG: CLEANED TOKEN ===", Token);
  console.log(
    "=== AUTH DEBUG: SECRET LENGTH ===",
    process.env.JWT_SECRET?.length,
  );
  console.log(
    "=== AUTH DEBUG: SECRET VALUE (FIRST 3 CHARS) ===",
    process.env.JWT_SECRET?.substring(0, 3),
  );

  let decoded;
  try {
    decoded = verifyToken({ token: Token });
  } catch (error) {
    return next(new Error(error.message || "Invalid or expired token!"), {
      cause: 401,
    });
  }

  const { id } = decoded;

  const user = await User.findById(id).select("-password").lean();
  if (!user) return next(new Error("User not found!"), { cause: 404 });

  if (!user.isLoggedIn)
    return next(new Error("try to login again!"), { cause: 401 });

  req.user = user;
  return next();
});

export default isAuthenticated;
