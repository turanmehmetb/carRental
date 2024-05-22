import {WinstonModule} from 'nest-winston';

import {Reservation} from '@carRental/models';
import {loggerConfig} from '@carRental/utils';
import {Module, OnModuleInit} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule, SchemaFactory} from '@nestjs/mongoose';
import {PassportModule} from '@nestjs/passport';

import {ReservationController} from './reservation.controller';
import {ReservationMockData} from './reservation.mock.data';
import {ReservationSchema} from './reservation.schema';
import {ReservationService} from './reservation.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Reservation.name,
                collection: 'Reservations',
                schema: SchemaFactory.createForClass(ReservationSchema),
            },
        ]),
        PassportModule,
        ConfigModule,
    ],
    controllers: [ReservationController],
    providers: [
        ReservationService,
        {
            provide: Reservation.name,
            useValue: WinstonModule.createLogger({
                transports: loggerConfig(Reservation.name),
            }),
        },
    ],
    exports: [ReservationService],
})
export class ReservationModule implements OnModuleInit {
    constructor(private readonly reservationService: ReservationService) {}

    async onModuleInit() {
        await this.populateMockData();
    }

    async populateMockData() {
        try {
            const reservations = await this.reservationService.getAll();
            if (reservations.length === 0) {
                await this.reservationService.insertMany(
                    ReservationMockData.defaultReservations,
                );
                console.log('Default reservations inserted successfully.');
            }
        } catch (error) {
            console.error('Error inserting default reservations:', error);
        }
    }
}
