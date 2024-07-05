import { Id } from "../value-objects/id";
import { User } from "./user";

describe("User entity unit tests", () => {
  const nonPersistedUserParams = {
    nickName: "John Doe",
    email: "john@gmail.com",
    password: "123123",
    birthdate: new Date("1990-01-01"),
    bio: "I'm a developer",
  };
  const persistedUserParams = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    profilePicture: "xpto",
    nickName: "John Doe",
    email: "john@gmail.com",
    password: "123123",
    birthdate: new Date("1990-01-01"),
    bio: "I'm a developer",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  function createPersistedUser(): User {
    return new User(persistedUserParams);
  }

  it("should create a non-persisted new user", () => {
    const user = new User(nonPersistedUserParams);
    expect(user).toBeInstanceOf(User);
    expect(user.id).toBeInstanceOf(Id);
    expect(user.profilePicture).toBeUndefined();
    expect(user.createdAt).toBeUndefined();
    expect(user.updatedAt).toBeUndefined();
    expect(user.nickName).toBe(nonPersistedUserParams.nickName);
    expect(user.email).toBe(nonPersistedUserParams.email);
    expect(user.password).toBe(nonPersistedUserParams.password);
    expect(user.birthdate).toBe(nonPersistedUserParams.birthdate);
    expect(user.bio).toBe(nonPersistedUserParams.bio);
  });

  it("should create a persisted new user", () => {
    const user = new User(persistedUserParams);

    expect(user).toBeInstanceOf(User);
    expect(user.id.getValue()).toBe(persistedUserParams.id);
    expect(user.nickName).toBe(persistedUserParams.nickName);
    expect(user.email).toBe(persistedUserParams.email);
    expect(user.password).toBe(persistedUserParams.password);
    expect(user.birthdate).toBe(persistedUserParams.birthdate);
    expect(user.profilePicture).toBe(persistedUserParams.profilePicture);
    expect(user.bio).toBe(persistedUserParams.bio);
    expect(user.createdAt).toBe(persistedUserParams.createdAt);
    expect(user.updatedAt).toBe(persistedUserParams.updatedAt);
  });

  it("should return a JSON from entity", () => {
    const user = createPersistedUser();
    const toJson = user.toJSON();
    expect(toJson).toEqual(persistedUserParams);
  });

  it("should update nickname", () => {
    const user = createPersistedUser();
    expect(user.nickName).toBe(persistedUserParams.nickName);
    user.updateNickname("Jane Doe");
    expect(user.nickName).toBe("Jane Doe");
  });

  it("should update profile picture", () => {
    const user = createPersistedUser();
    expect(user.profilePicture).toBe(persistedUserParams.profilePicture);
    user.updateProfilePicture("new-picture");
    expect(user.profilePicture).toBe("new-picture");
  });

  it("should update bio", () => {
    const user = createPersistedUser();
    expect(user.bio).toBe(persistedUserParams.bio);
    user.updateBio("I'm a tester");
    expect(user.bio).toBe("I'm a tester");
  });

  it("should update password", () => {
    const user = createPersistedUser();
    expect(user.password).toBe(persistedUserParams.password);
    user.updatePassword("new-password");
    expect(user.password).toBe("new-password");
  });
});
