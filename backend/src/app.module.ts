import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { UnitsModule } from './units/units.module';
import { ProductsModule } from './products/products.module';
import { StatusModule } from './status/status.module';
import { KindidentityModule } from './kindidentity/kindidentity.module';
import { PersonModule } from './person/person.module';
import { KindmovementsModule } from './kindmovements/kindmovements.module';
import { HeaderModule } from './header/header.module';
import { classificationPeopleModule } from './classification_people/classificationPeople.module';
import { ClassificationkindmovementModule } from './classificationkindmovement/classificationkindmovement.module';
import { ConsecutiveModule } from './consecutive/consecutive.module';
import { MovementsModule } from './movements/movements.module';
import { ConversionModule } from './conversion/conversion.module';
import { SignsModule } from './signs/signs.module';
import { SettingsModule } from './settings/settings.module';
import { ClientManufacturerModule } from './client-manufacturer/client-manufacturer.module';
import { SettingsStatusModule } from './settings-status/settings-status.module';
import { PermissionModule } from './permission/permission.module';


@Module({
  imports: [
   
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1995',
      database: 'test',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      retryDelay: 3000,
      retryAttempts: 10,
      logging: true
    }),
    UsersModule,
    UnitsModule,
    ProductsModule,
    StatusModule,
    KindidentityModule,
    PersonModule,
    KindmovementsModule,
    HeaderModule,
    classificationPeopleModule,
    ClassificationkindmovementModule,
    ConsecutiveModule,
    MovementsModule,
    ConversionModule,
    SignsModule,
    SettingsModule,
    ClientManufacturerModule,
    SettingsStatusModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
