import { asyncHandler } from "../utils/asynchandler.js";
import userServices from "../services/user.services.js";
import ApiResponse from "../utils/api.response.js";
import messageHandler from "../constant/messagehandler.js";

const createUser = asyncHandler(async (req, res) => {
  const userDto = req.body;
  const response = await userServices.createUser(userDto);
  return res
    .status(200)
    .json(new ApiResponse(200, response, messageHandler.user.userCreated));
});

const getAllUsers = asyncHandler(async (_, res) => {
  const response = await userServices.getAllUsers();
  return res
    .status(200)
    .json(new ApiResponse(200, response, messageHandler.user.getAllUsers));
});
const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const response = await userServices.getUserById(userId);
  return res
    .status(200)
    .json(new ApiResponse(200, response, messageHandler.user.getUserById));
});

const updateUser = asyncHandler(async (req, res) => {
  const userDto = req.body;
  const response = await userServices.updateUser(req.params.id, userDto);
  return res
    .status(200)
    .json(new ApiResponse(200, response, messageHandler.user.userUpdated));
});

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const response = await userServices.deleteUser(userId);
  return res
    .status(200)
    .json(new ApiResponse(200, response, messageHandler.user.userDeleted));
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const response = await userServices.userLogin(username, password);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: response.loggedInUser, auth: response.accessToken },
        messageHandler.user.userCustomizeMessage("logged in")
      )
    );
});

const loadInitaliUserData = asyncHandler(async (req, res) => {
  console.log("load Controller");
  const response = await userServices.loadInitialUsers();
  return res
    .status(201)
    .json(new ApiResponse(201, null, "User load Sucessfull !"));
});
export default {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  login,
  loadInitaliUserData,
};
