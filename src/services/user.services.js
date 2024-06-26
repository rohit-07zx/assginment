import { errorHandler } from "../constant/errorhandler.js";
import messageHandler from "../constant/messagehandler.js";
import { User } from "../models/user.model.js";
import { ValidationException } from "../utils/api.error.js";
import { uservalidator } from "../validators/user.validation.js";
import { users } from "../constant/demo.users.js";

const credentials = "-password";
const getAllUsers = async () => {
  let response;
  try {
    response = await User.find().select(credentials);
  } catch (error) {
    throw new ValidationException(404, messageHandler.user.userNotFound);
  }
  return response;
};
const getUserById = async (Id) => {
  let response;
  try {
    response = await User.findOne({ _id: Id }).select(credentials);
  } catch (error) {
    throw new ValidationException(404, messageHandler.user.userNotFound);
  }
  return response;
};

const createUser = async (userDto) => {
  let response;
  await uservalidator(userDto);
  const isUserExists = await User.find(userDto);

  if (isUserExists.length != 0) {
    throw new ValidationException(401, messageHandler.user.isUserExists);
  }
  try {
    response = await User.create(userDto);
  } catch (error) {
    throw new ValidationException(
      401,
      messageHandler.user.userCustomizeMessage("not created")
    );
  }
  return response;
};

const updateUser = async (userId, userDto) => {
  let response;
  await uservalidator(userDto);
  try {
    const isUser = await User.findById(userId).select("-password");
    if (!isUser) {
      throw new ValidationException(404, messageHandler.user.isUserExists);
    }
    response = await User.updateOne(userDto);
    if (response.modifiedCount == 1) {
      return isUser;
    } else {
      return;
    }
  } catch (error) {
    throw new ValidationException(
      401,
      messageHandler.user.userCustomizeMessage("not updated")
    );
  }
};

const deleteUser = async (Id) => {
  let response;
  const isUserExists = await User.findById(Id);

  if (!isUserExists) {
    throw new ValidationException(401, messageHandler.user.userNotFound);
  }

  try {
    response = await User.deleteOne({ _id: Id }).select(credentials);
    if (response.deletedCount == 1) {
      return;
    }
  } catch (error) {
    throw new ValidationException(
      404,
      messageHandler.user.userCustomizeMessage("not deleted")
    );
  }
  return response;
};

const userLogin = async (username, password) => {
  const user = await User.findOne({
    username,
  });

  if (!user) {
    throw new ValidationException(404, messageHandler.user.userNotFound);
  }
  const ispaswordValid = await user.isPasswordCorrect(password);
  if (!ispaswordValid) {
    throw new ValidationException(401, errorHandler.user.isPassword);
  }
  const accessToken = await user.generateAccessToken(user._id);

  const loggedInUser = await User.findById(user._id).select(credentials);

  return { accessToken, loggedInUser };
};

const loadInitialUsers = async () => {
  let response;
  //uservalidator(userDto);

  try {
    response = await User.create(users);
  } catch (error) {
    throw new ValidationException(401, "User not created Succesfully!");
  }
  return response;
};
export default {
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  userLogin,
  loadInitialUsers,
};
