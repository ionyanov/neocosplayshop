import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { hash, verify } from 'argon2';
import { LogService } from 'src/log.service';
import { PrismaService } from 'src/prisma.service';
import { AdminUserDto, PasswordDto, UserDto } from './user.dto';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService, private readonly logger: LogService) {
	}

	async getUsers() {
		let users: User[]
		try {
			users = await this.prisma.user.findMany({
				orderBy: {
					id: 'asc'
				}
			})
		}
		catch (e) {
			await this.logger.LogMessage(e, 'Can`t select users!');
		}
		return users
	}

	async getUserById(id: number) {
		let user: User;
		try {
			user = await this.prisma.user.findUnique({
				where: {
					id: id,
				},
			});
		}
		catch (e) {
			await this.logger.LogMessage(e, 'Can`t select user!');
		}
		return user;
	}

	async getUserByEmail(email: string) {
		let user: User;
		try {
			user = await this.prisma.user.findUnique({
				where: {
					email: email,
				},
			});
		}
		catch (e) {
			await this.logger.LogMessage(e, 'Can`t select user!');
		}
		return user
	}

	async create(email: string, password: string) {
		let user: User;
		try {
			user = await this.prisma.user.create({
				data: {
					email: email,
					password: await hash(password),
					avarat: process.env.AVATAR_DAFAULT,
				},
			});
		}
		catch (e) {
			await this.logger.LogMessage(e, 'Can`t create user!');
		}
		return user;
	}

	async validateUser(email: string, password: string) {
		const user = await this.getUserByEmail(email);
		if (!user) throw new UnauthorizedException('Wrong credencial!');
		const isValid = await verify(user.password, password);
		if (isValid) {
			if (user.lockflg)
				throw new UnauthorizedException('Account locked!');

			await this.prisma.user.update({
				data: {
					updated: new Date(),
					lockcount: 0,
					lockflg: false
				},
				where: {
					id: user.id,
				},
			});
		}
		else {
			if (user.lockflg)
				throw new UnauthorizedException('Wrong credencial!');

			if (user.lockcount + 1 >= +process.env.LOCK_LIMIT) {
				await this.prisma.user.update({
					data: {
						updated: new Date(),
						lockcount: user.lockcount + 1,
						lockflg: true,
					},
					where: {
						id: user.id,
					},
				});
			}
			else {
				await this.prisma.user.update({
					data: {
						updated: new Date(),
						lockcount: user.lockcount + 1
					},
					where: {
						id: user.id,
					},
				});
			}
			throw new UnauthorizedException('Wrong credencial!');
		}
		return user;
	}

	async updateOne(id: number, dataDto: UserDto) {
		let user: User;
		try {
			user = await this.prisma.user.update({
				data: {
					avarat: dataDto.avarat,
					updated: new Date(),
					email: dataDto.email,
				},
				where: {
					id: id,
				},
			});
		}
		catch (e) {
			await this.logger.LogMessage(e, 'Can`t update user!');
		}
		return user;
	}

	async setPassword(dataDto: PasswordDto) {
		try {
			let user: User = await this.validateUser(dataDto.email, dataDto.oldPassword);
			if (!user) throw new UnauthorizedException('Wrong credencial!');
			user = await this.prisma.user.update({
				data: {
					password: await hash(dataDto.newPassword),
					lockcount: 0,
					updated: new Date()
				},
				where: {
					id: user.id,
				},
			});
		}
		catch (e) {
			await this.logger.LogMessage(e, 'Can`t set password!');
		}
		return 'success';
	}

	async update(userDto: AdminUserDto) {
		let user: User;
		try {
			user = await this.prisma.user.update({
				data: {
					avarat: userDto.avarat,
					email: userDto.email,
					lockflg: userDto.lockflg,
					lockcount: userDto.lockcount,
					role: userDto.role,
					updated: new Date()
				},
				where: {
					id: userDto.id,
				},
			});
		}
		catch (e) {
			await this.logger.LogMessage(e, 'Can`t update user!');
		}
		return user;
	}
}
