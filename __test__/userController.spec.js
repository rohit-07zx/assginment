import userServices from "../src/services/user.services.js";
import userController from "../src/controllers/user.controller.js";
import httpMocks from "node-mocks-http";

describe("User Controller", () => {
  let mockUser, req, res, next, mockAuthenticate;

  beforeEach(() => {
    mockUser = {
      username: "John Doe",
      email: "john@example.com",
      password: "password123",
    };
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
    mockAuthenticate = jest.fn((req, res, next) => {
      req.user = mockUser;
      next();
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should create a user", async () => {
    req.body = mockUser;
    jest.spyOn(userServices, "createUser").mockResolvedValue(mockUser);

    await userController.createUser(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(userServices.createUser).toHaveBeenCalledTimes(1);
    expect(JSON.stringify(JSON.parse(res._getData()).data)).toBe(
      JSON.stringify(mockUser)
    );
  });

  it("should get a user by ID", async () => {
    req.params.id = "some-id";
    jest.spyOn(userServices, "getUserById").mockResolvedValue(mockUser);

    req.headers["authorization"] = "Bearer mockToken";
    mockAuthenticate(req, res, next);
    await userController.getUserById(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(userServices.getUserById).toHaveBeenCalledTimes(1);
    expect(JSON.stringify(JSON.parse(res._getData()).data)).toBe(
      JSON.stringify(mockUser)
    );
  });

  it("should get all users", async () => {
    jest.spyOn(userServices, "getAllUsers").mockResolvedValue([mockUser]);

    req.headers["authorization"] = "Bearer mockToken";
    mockAuthenticate(req, res, next);

    await userController.getAllUsers(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(JSON.stringify(JSON.parse(res._getData()).data)).toBe(
      JSON.stringify([mockUser])
    );
    expect(userServices.getAllUsers).toHaveBeenCalledTimes(1);
  });

  it("should update a user by ID", async () => {
    req.params.id = "some-id";
    req.body = { name: "Jane Doe" };
    jest.spyOn(userServices, "updateUser").mockResolvedValue(mockUser);

    req.headers["authorization"] = "Bearer mockToken";
    mockAuthenticate(req, res, next);

    await userController.updateUser(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(JSON.stringify(JSON.parse(res._getData()).data)).toBe(
      JSON.stringify(mockUser)
    );
    expect(userServices.updateUser).toHaveBeenCalledTimes(1);
  });

  it("should delete a user by ID", async () => {
    req.params.id = "some-id";
    jest.spyOn(userServices, "deleteUser").mockResolvedValue(mockUser);

    req.headers["authorization"] = "Bearer mockToken";
    mockAuthenticate(req, res, next);

    await userController.deleteUser(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res._getData()).message).toBe(
      "User deleted successfully!"
    );
    expect(userServices.deleteUser).toHaveBeenCalledTimes(1);
  });
});
