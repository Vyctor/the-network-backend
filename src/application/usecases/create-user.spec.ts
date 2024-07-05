import { User } from "../../domain/entities/user";
import { UserRepository } from "../repository/user-repository";
import { CreateUserUsecase } from "./create-user";

describe("Create User Usecase unit tests", () => {
  let mockUserRepository = (): UserRepository => ({
    create: jest.fn(),
    update: jest.fn(),
    list: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    findByNickname: jest.fn(),
    findByEmailOrNickname: jest.fn(),
  });
  let createUserUsecase: CreateUserUsecase;
  let user: User;

  beforeEach(() => {
    user = new User({
      id: "xpto",
      profilePicture: "xpto",
      nickName: "John Doe",
      email: "john@gmail.com",
      password: "123123",
      birthdate: new Date("1990-01-01"),
      bio: "I'm a developer",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  it("should create a user", async () => {
    const userRepo = mockUserRepository();
    createUserUsecase = new CreateUserUsecase(userRepo);

    const findByEmailOrNicknameSpy = jest
      .spyOn(userRepo, "findByEmailOrNickname")
      .mockResolvedValue(null);

    const createSpy = jest.spyOn(userRepo, "create").mockResolvedValue();

    await createUserUsecase.execute(user);
    expect(findByEmailOrNicknameSpy).toHaveBeenCalledWith(
      user.email,
      user.nickName
    );
    expect(createSpy).toHaveBeenCalledWith(user);
  });

  it("should throw an error if already exists an user using same email or nickname", async () => {
    const userRepo = mockUserRepository();
    createUserUsecase = new CreateUserUsecase(userRepo);

    const findByEmailOrNicknameSpy = jest
      .spyOn(userRepo, "findByEmailOrNickname")
      .mockResolvedValue(user);

    const createSpy = jest.spyOn(userRepo, "create").mockResolvedValue();

    await expect(createUserUsecase.execute(user)).rejects.toThrowError(
      "User already exists"
    );
    expect(findByEmailOrNicknameSpy).toHaveBeenCalledWith(
      user.email,
      user.nickName
    );
  });
});