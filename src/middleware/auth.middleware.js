import { asyncHandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ValidationException } from "../utils/api.error.js";

const verifyJwt = asyncHandler(async (req, _, next) => {
  const token = req?.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new ValidationException(400, "invalid auth token!");
  }

  const decodeToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decodeToken._id).select("-password");
  if (!user) {
    throw new ValidationException(401, "Invalid access token");
  }

  //user assign to request
  req.user = user;
  next();
});

export { verifyJwt };
