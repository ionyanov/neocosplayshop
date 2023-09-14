import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
    @IsEmail()
    email: string;

    @MinLength(6, { message: 'wrong lenght' })
    @IsString()
    password: string;
}

export class RefreshTokenDto {
    @IsString()
    refreshToken: string;
}

export class PasswordDto extends AuthDto {
    @MinLength(6, { message: 'wrong lenght' })
    @IsString()
    newPassword: string;
}
