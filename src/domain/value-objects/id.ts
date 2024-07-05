import { v4 as uuid, validate } from "uuid";

export class Id {
  private constructor(private value: string) {}

  static create(value?: string): Id {
    if (!value) {
      return new Id(uuid());
    }
    const isUuid = validate(value);
    if (!isUuid) {
      throw new Error("Invalid id");
    }
    return new Id(value);
  }

  getValue(): string {
    return this.value;
  }

  static validate(value: string): boolean {
    return validate(value);
  }
}
