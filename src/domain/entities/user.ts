import { Id } from "../value-objects/id";

export interface UserConstructorProps {
  id?: string;
  nickName: string;
  email: string;
  password: string;
  birthdate: Date;
  bio: string;
  profilePicture?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  private _id: Id;
  private _nickName: string;
  private _email: string;
  private _password: string;
  private _birthdate: Date;
  private _bio: string;
  private _profilePicture?: string;
  private _createdAt?: Date;
  private _updatedAt?: Date;

  constructor(props: UserConstructorProps) {
    this._id = Id.create(props.id);
    this._nickName = props.nickName;
    this._email = props.email;
    this._password = props.password;
    this._birthdate = props.birthdate;
    this._bio = props.bio;
    this._profilePicture = props.profilePicture;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  get id() {
    return this._id;
  }

  get nickName() {
    return this._nickName;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  get birthdate() {
    return this._birthdate;
  }

  get bio() {
    return this._bio;
  }

  get profilePicture() {
    return this._profilePicture;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  public updateNickname(nickName: string): void {
    this._nickName = nickName;
  }

  public updateProfilePicture(profilePicture: string): void {
    this._profilePicture = profilePicture;
  }

  public updateBio(bio: string): void {
    this._bio = bio;
  }

  public updatePassword(password: string): void {
    this._password = password;
  }

  toJSON() {
    return {
      id: this._id.getValue(),
      nickName: this._nickName,
      email: this._email,
      password: this._password,
      birthdate: this._birthdate,
      bio: this._bio,
      profilePicture: this._profilePicture,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
