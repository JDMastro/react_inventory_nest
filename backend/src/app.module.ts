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
import { RolesModule } from './roles/roles.module';
import { ClassificationkindmovementModule } from './classificationkindmovement/classificationkindmovement.module';
import { ConsecutiveModule } from './consecutive/consecutive.module';
import { MovementsModule } from './movements/movements.module';

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
      retryAttempts: 10
    }),
    UsersModule,
    UnitsModule,
    ProductsModule,
    StatusModule,
    KindidentityModule,
    PersonModule,
    KindmovementsModule,
    HeaderModule,
    RolesModule,
    ClassificationkindmovementModule,
    ConsecutiveModule,
    MovementsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}