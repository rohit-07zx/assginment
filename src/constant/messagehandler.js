const messageHandler = {
  user: {
    userCreated: "User created successfully!",
    userUpdated: "User updated successfully!",
    userDeleted: "User deleted successfully!",
    getUserById: "User retrieve successfully!",
    getAllUsers: "Users retrieve successfully!",
    isUserExists: "User is already exists!",
    userNotFound: "User not found!",
    userCustomizeMessage: (data) => `User ${data} Succesfully!`,
  },
};

export default messageHandler;
