import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { SettingsModule } from './settings/settings.module';
import { LogService } from './log.service';
import { CategoryModule } from './category/category.module';

@Module({
    imports: [ConfigModule.forRoot(), AuthModule, SettingsModule, CategoryModule],
    controllers: [AppController],
    providers: [AppService, PrismaService, LogService],
})
export class AppModule {
}
