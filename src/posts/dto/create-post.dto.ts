import { IsNumber, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
      maxDecimalPlaces: 0,
    },
    {
      message: 'AuthorID precisa ser um número inteiro',
    },
  )
  authorId: number;

  @IsString({
    message: 'O conteúdo precisa ser uma string',
  })
  @Length(1, 160, {
    message: 'O conteúdo não pode ter mais de 160 caracteres',
  })
  content: string;
}
