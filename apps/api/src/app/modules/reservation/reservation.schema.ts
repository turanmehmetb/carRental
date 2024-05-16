import {Document} from 'mongoose';

import {Reservation, ReservationStatus, User, Vehicle} from '@carRental/models';
import {Prop, Schema} from '@nestjs/mongoose';

import {BaseSchema} from '../base/base.schema';

@Schema({versionKey: false})
export class ReservationSchema extends BaseSchema implements Reservation {
    @Prop({type: User})
    user: User;

    @Prop({type: Vehicle})
    vehicle: Vehicle;

    @Prop()
    startDate: number;

    @Prop()
    endDate: number;

    @Prop({
        type: String,
        enum: ReservationStatus,
        default: ReservationStatus.Pending,
    })
    reservationStatus: ReservationStatus;
}
