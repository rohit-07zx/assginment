import mongoose from "mongoose";
import { User } from "../../src/models/user.model";
import userServices from "../../src/services/user.services";

describe("User services", () => {
  let mockUser;

  beforeEach(() => {
    mockUser = new User({
      username: "JohnDoe",
      password: "password123",
      email: "john@example.com",
      city: "solly",
      zipcode: 346789,
      age: 24,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should create a user", async () => {
    const findMock = jest.fn().mockResolvedValue([]);
    const createMock = jest.fn().mockResolvedValue(mockUser);
    User.create = createMock;
    User.find = findMock;

    const result = await userServices.createUser({
      username: "JohnDoe",
      password: "password123",
      email: "john@example.com",
      city: "solly",
      zipcode: 346789,
      age: 24,
    });
    expect(result).toBeInstanceOf(Object);
    expect(result.username).toBe("JohnDoe");
    expect(User.create).toHaveBeenCalledTimes(1);
  });

  it("should get a user by ID", async () => {
    const selectMock = jest.fn().mockResolvedValue(mockUser);
    const findOneMock = jest.fn().mockReturnValue({ select: selectMock });

    User.findOne = findOneMock;
    const result = await userServices.getUserById(
      new mongoose.Types.ObjectId()
    );

    expect(result).toBeInstanceOf(Object);
    expect(result.username).toBe("JohnDoe");
    expect(User.findOne).toHaveBeenCalledTimes(1);
  });

  it("should get all users", async () => {
    const selectMock = jest.fn().mockResolvedValue([mockUser]);
    const findMock = jest.fn().mockReturnValue({ select: selectMock });

    User.find = findMock;
    const result = await userServices.getAllUsers();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(1);
    expect(User.find).toHaveBeenCalledTimes(1);
  });

  it("should update a user by ID", async () => {
    const selectMock = jest.fn().mockResolvedValue(mockUser);
    const findByIdMock = jest.fn().mockReturnValue({ select: selectMock });
    User.findById = findByIdMock;
    jest.spyOn(User, "updateOne").mockResolvedValue({ modifiedCount: 1 });
    const result = await userServices.updateUser(
      new mongoose.Types.ObjectId(),
      {
        username: "JohnDoe",
        password: "password123",
        email: "john@example.com",
        city: "solly",
        zipcode: 346789,
        age: 24,
      }
    );
    console.log(result);

    expect(result).toBeInstanceOf(Object);
    expect(result.username).toBe("JohnDoe");
    expect(User.updateOne).toHaveBeenCalledTimes(1);
  });

  it("should delete a user by ID", async () => {
    jest.spyOn(User, "findById").mockResolvedValue(mockUser);
    const selectMock = jest.fn().mockResolvedValue(mockUser);
    const deleteOne = jest.fn().mockReturnValue({ select: selectMock });

    User.deleteOne = deleteOne;
    const result = await userServices.deleteUser(new mongoose.Types.ObjectId());
    expect(result).toBeInstanceOf(Object);
    expect(result.username).toBe("JohnDoe");
    expect(User.deleteOne).toHaveBeenCalledTimes(1);
  });
});
