export interface UserConstructorProps {
  id: number;
  email: string;
  name: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export class User {
  id: number;
  email: string;
  name: string;
  password: string;
  created_at: Date;
  updated_at: Date;

  constructor(props: UserConstructorProps) {
    this.id = props.id;
    this.email = props.email;
    this.name = props.name;
    this.password = props.password;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }

  toJSON(omitPassword: boolean = true) {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      created_at: this.created_at,
      updated_at: this.updated_at,
      ...(omitPassword ? {} : { password: this.password }),
    };
  }
}
