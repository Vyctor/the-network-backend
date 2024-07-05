import { hashSync } from "bcrypt";
import { UserRepository } from "../../repository/user-repository";
import { User } from "../../../domain/entities/user";

export interface CreateUserUsecaseInput {
  nickName: string;
  email: string;
  password: string;
  birthdate: Date;
  bio: string;
}

export class CreateUserUsecase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: CreateUserUsecaseInput): Promise<void> {
    const existingUser = await this.userRepository.findByEmailOrNickname(
      input.email,
      input.nickName
    );
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = hashSync(input.password, 10);
    const user = new User({
      nickName: input.nickName,
      email: input.email,
      password: hashedPassword,
      birthdate: input.birthdate,
      bio: input.bio,
    });
    await this.userRepository.create(user);
  }
}
