import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  @Matches(/^\S*$/, {
    message: 'Username should not contain spaces',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string;
}
