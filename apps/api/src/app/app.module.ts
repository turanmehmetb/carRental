import {join} from 'path';

import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {APP_FILTER} from '@nestjs/core';
import {MongooseModule} from '@nestjs/mongoose';
import {ServeStaticModule} from '@nestjs/serve-static';

import {configuration} from '../assets/config/configuration';
import {HttpExceptionFilter} from './error/httpExceptionFilter';
import {LoggerMiddleware} from './middleware/logger.middleware';
import {JwtStrategy} from './modules/user/authentication/jwt.strategy';
import {UserModule} from './modules/user/user.module';
import {VehicleModule} from './modules/vehicle/vehicle.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://mongo/CarRentalSystem'),
        // MongooseModule.forRoot('mongodb://127.0.0.1:27017/CarRentalSystem'),
        ConfigModule.forRoot({
            envFilePath: `${__dirname}/assets/config/env/${
                process.env['NODE' + '_ENV']
            }.env`,
            load: [configuration],
        }),
        UserModule,
        VehicleModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'carRental'),
        }),
    ],
    controllers: [],
    providers: [
        JwtStrategy,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
