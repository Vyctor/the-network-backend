export interface PostConstructorProps {
  id?: number;
  authorId: number;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class Post {
  public id: number;
  public authorId: number;
  public content: string;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;

  constructor(props: PostConstructorProps) {
    this.id = props?.id;
    this.authorId = props.authorId;
    this.content = props.content;
    this.createdAt = props?.createdAt;
    this.updatedAt = props?.updatedAt;
    this.deletedAt = props?.deletedAt;
  }
}
