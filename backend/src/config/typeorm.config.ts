import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";


export class TypeOrmConfig {
    static getOrmConfig(configureService: ConfigService): TypeOrmModuleOptions {

        return {
            type: 'postgres',
            host: configureService.get<string>('DB_HOST'),
            port: configureService.get<number>('DB_PORT'),
            username: configureService.get<string>('DB_USERNAME'),
            password: configureService.get<string>('DB_PASSWORD'),
            database: configureService.get('DB_DATABASE'),
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: false,
            retryDelay: 3000,
            retryAttempts: 10,
            logging: true
        }
    }
}

export const typeOrmModuleOptionsAsync: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (configureService: ConfigService):
        Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configureService),
    inject: [ConfigService]
}
