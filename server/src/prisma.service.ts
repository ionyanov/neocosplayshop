import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientOptions } from '@prisma/client/runtime/library';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Injectable()
export class PrismaService extends PrismaClient<PrismaClientOptions, 'query'> implements OnModuleInit {
    constructor() {
        super({
            log: [
                { emit: 'event', level: 'query' },
                { emit: 'stdout', level: 'info' },
                { emit: 'stdout', level: 'warn' },
                { emit: 'stdout', level: 'error' },
            ],
            errorFormat: 'colorless',
        });
    }

    async onModuleInit() {
        await this.$connect();
    }

    public LogOn() {
        this.$on('query', (e) => {
            console.log('Query: ' + e.query);
            console.log('Params: ' + e.params);
            console.log('Duration: ' + e.duration + 'ms');
        });
    }

    getBaseField() {
        return {
            id: true,
            name: true
        }
    }
}

export class IBaseType {
    @IsNumber()
    @IsNotEmpty()
    id: number

    @IsString()
    name: string
}