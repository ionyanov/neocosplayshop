import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { hash, verify } from 'argon2';
import { LogService } from 'src/log.service';
import { PrismaService } from '../prisma.service';
import { AuthDto, RefreshTokenDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService, private readonly logger: LogService) {
    }

    async getProfile(userId: string) {
        let user: User;
        try {
            if (!userId)
                throw new BadRequestException('Can`t find user!');
            user = await this.prisma.user.findUnique({
                where: {
                    id: +userId
                },
            });
        }
        catch (e) {
            await this.logger.LogMessage(e, 'Can`t find user!');
        }

        return user;
    }

    async register(body: AuthDto) {
        let user: User;
        let tokens: any;
        try {
            const oldUser = await this.prisma.user.findUnique({
                where: {
                    email: body.email,
                },
            });
            if (oldUser) throw new BadRequestException('User already exists');

            user = await this.prisma.user.create({
                data: {
                    email: body.email,
                    username: body.email,
                    password: await hash(body.password), // await hash(body.password)
                    avarat: '',
                    role: 'ADMIN',
                },
            });

            tokens = await this.issueTokes(user.id);
        }
        catch (e) {
            await this.logger.LogMessage(e, 'Can`t register user!');
        }

        return { user: this.returnUserFields(user), ...tokens };
    }

    async login(body: AuthDto) {
        const user = await this.validateUser(body);
        const tokens = await this.issueTokes(user.id);

        return { user: this.returnUserFields(user), ...tokens };
    }

    async getNewToken(body: RefreshTokenDto) {
        const result = await this.jwt.verifyAsync(body.refreshToken);
        if (!result) throw new UnauthorizedException('Sessions expire');

        const user = await this.prisma.user.findUnique({
            where: {
                id: result.id,
            },
        });

        const tokens = await this.issueTokes(user.id);

        return { user: this.returnUserFields(user), ...tokens };
    }

    private async issueTokes(userId: number) {
        const data = { id: userId };

        const accessToken = this.jwt.sign(data, {
            expiresIn: '1h'
        });
        const refreshToken = this.jwt.sign(data, {
            expiresIn: '24h',
        });

        return { accessToken, refreshToken };
    }

    private returnUserFields(user: User) {
        return {
            id: user.id,
            email: user.email,
            role: user.role
        };
    }

    private async validateUser(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user) throw new UnauthorizedException('Wrong credencial!');

        const isValid = await verify(user.password, dto.password);
        if (!isValid) throw new UnauthorizedException('Wrong credencial!');

        return user;
    }
}
