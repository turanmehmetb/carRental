import {WinstonModule} from 'nest-winston';

import {Reservation} from '@carRental/models';
import {loggerConfig} from '@carRental/utils';
import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule, SchemaFactory} from '@nestjs/mongoose';
import {PassportModule} from '@nestjs/passport';

import {ReservationController} from './reservation.controller';
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
export class ReservationModule {}
