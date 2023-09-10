import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { LogService } from 'src/log.service';
import { AuthDto, RefreshTokenDto } from './auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userSrv: UserService, private readonly jwt: JwtService, private readonly logger: LogService) {
    }

    async getProfile(userId: string) {
        let user: User;
        try {
            if (!userId)
                throw new BadRequestException('Can`t find user!');
            user = await this.userSrv.getUserById(+userId);
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
            const oldUser = await this.userSrv.getUserByEmail(body.email);
            if (oldUser) throw new BadRequestException('User already exists');

            user = await this.userSrv.create(body.email, body.password)
            tokens = await this.issueTokes(user.id);
        }
        catch (e) {
            await this.logger.LogMessage(e, 'Can`t register user!');
        }

        return { user: this.returnUserFields(user), ...tokens };
    }

    async login(body: AuthDto) {
        const user = await this.userSrv.validateUser(body.email, body.password);
        const tokens = await this.issueTokes(user.id);

        return { user: this.returnUserFields(user), ...tokens };
    }

    async getNewToken(body: RefreshTokenDto) {
        const result = await this.jwt.verifyAsync(body.refreshToken, { secret: process.env.TOKEN_REFRESH_KEY });
        if (!result) throw new UnauthorizedException('Sessions expire');

        const user = await this.userSrv.getUserById(result.id);
        const tokens = await this.issueTokes(user.id);

        return { user: this.returnUserFields(user), ...tokens };
    }

    private async issueTokes(userId: number) {
        const data = { id: userId };

        const accessToken = this.jwt.sign(data, {
            expiresIn: process.env.TOKEN_DURATION
        });
        const refreshToken = this.jwt.sign(data, {
            expiresIn: process.env.TOKEN_REFRESH_DURATION,
            secret: process.env.TOKEN_REFRESH_KEY
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
}
