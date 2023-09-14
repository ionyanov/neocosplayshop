import { Role } from "@prisma/client";

export class UserDto {
    email: string;
    password: string;
    avarat: string;
}

export class AdminUserDto {
    id: number;
    created: Date;
    updated: Date;
    email: string;
    password: string;
    role: Role;
    lockcount: number;
    lockflg: boolean;
    avatar: string;
    lastlogin: Date;
}
