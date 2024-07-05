import { User } from "../../domain/entities/user";
import { UserRepository } from "../repository/user-repository";

export class CreateUserUsecase {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User): Promise<void> {
    const existingUser = await this.userRepository.findByEmailOrNickname(
      user.email,
      user.nickName
    );

    if (existingUser) {
      throw new Error("User already exists");
    }

    await this.userRepository.create(user);
  }
}
