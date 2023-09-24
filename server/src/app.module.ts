import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { SettingsModule } from './settings/settings.module';
import { LogService } from './log.service';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { PropertiesModule } from './properties/properties.module';
import { ProductModule } from './product/product.module';
import { ImagesModule } from './images/images.module';
import { DescriptionModule } from './description/description.module';
import { ProdPropertiesModule } from './prodproperties/prodproperties.module';

@Module({
    imports: [ConfigModule.forRoot(), AuthModule, SettingsModule, CategoryModule, UserModule,
        PropertiesModule, ProductModule, ImagesModule, DescriptionModule, ProdPropertiesModule],
    controllers: [AppController],
    providers: [AppService, PrismaService, LogService],
})
export class AppModule {
}
