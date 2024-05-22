import {WinstonModule} from 'nest-winston';

import {Vehicle} from '@carRental/models';
import {loggerConfig} from '@carRental/utils';
import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule, SchemaFactory} from '@nestjs/mongoose';
import {PassportModule} from '@nestjs/passport';

import {VehicleController} from './vehicle.controller';
import {VehicleSchema} from './vehicle.schema';
import {VehicleService} from './vehicle.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Vehicle.name,
                collection: 'Vehicles',
                schema: SchemaFactory.createForClass(VehicleSchema),
            },
        ]),
        PassportModule,
        ConfigModule,
    ],
    controllers: [VehicleController],
    providers: [
        VehicleService,
        {
            provide: Vehicle.name,
            useValue: WinstonModule.createLogger({
                transports: loggerConfig(Vehicle.name),
            }),
        },
    ],
    exports: [VehicleService],
})
export class VehicleModule {}
