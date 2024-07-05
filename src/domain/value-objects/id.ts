import { v4 as uuid, validate } from "uuid";

export class Id {
  private constructor(private value: string) {
    if (!validate(value)) throw new Error("Invalid id");
  }

  static create(value?: string): Id {
    if (!value) {
      return new Id(uuid());
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
