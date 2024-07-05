import { Id } from "./id";

describe("Uuid value object unit tests", () => {
  it("should create a new uuid", () => {
    const uuid = Id.create();
    expect(uuid).toBeDefined();
    expect(Id.validate(uuid.getValue())).toBe(true);
    expect(uuid).toBeInstanceOf(Id);
  });

  it("should create a new uuid with a value", () => {
    const genericUuid = "550e8400-e29b-41d4-a716-446655440000";
    const uuid = Id.create(genericUuid);
    expect(uuid.getValue()).toBe(genericUuid);
  });

  it("should throw an error when creating a uuid with an invalid value", () => {
    const invalidUuid = "invalid-uuid";
    expect(() => {
      Id.create(invalidUuid);
    }).toThrow("Invalid id");
  });
});
