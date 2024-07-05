import { User } from "../../domain/entities/user";

export interface UserRepository {
  create(user: User): Promise<void>;
  update(user: User): Promise<void>;
  list(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByNickname(nickname: string): Promise<User | null>;
  findByEmailOrNickname(email: string, nickname: string): Promise<User | null>;
}
