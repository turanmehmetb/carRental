import {WinstonModule} from 'nest-winston';

import {Vehicle} from '@carRental/models';
import {loggerConfig} from '@carRental/utils';
import {Module, OnModuleInit} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule, SchemaFactory} from '@nestjs/mongoose';
import {PassportModule} from '@nestjs/passport';

import {VehicleController} from './vehicle.controller';
import {VehicleMockData} from './vehicle.mock.data';
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
export class VehicleModule implements OnModuleInit {
    constructor(private readonly vehicleService: VehicleService) {}

    async onModuleInit() {
        await this.populateMockData();
    }

    async populateMockData() {
        try {
            const vehicles = await this.vehicleService.getAll();
            if (vehicles.length === 0) {
                await this.vehicleService.insertMany(
                    VehicleMockData.defaultVehicles,
                );
                console.log('Default vehicles inserted successfully.');
            }
        } catch (error) {
            console.error('Error inserting default vehicles:', error);
        }
    }
}
