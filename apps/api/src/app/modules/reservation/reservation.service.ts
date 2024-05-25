import {Model} from 'mongoose';

import {Reservation, ReservationStatus} from '@carRental/models';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';

import {BaseService} from '../base/base.service';
import {ReservationMockData} from './reservation.mock.data';

@Injectable()
export class ReservationService extends BaseService<Reservation> {
    constructor(
        @InjectModel('Reservation')
        private readonly reservationModel: Model<Reservation>,
    ) {
        super(reservationModel);
    }

    async findByUserId(userId: string): Promise<Reservation[]> {
        return this.reservationModel.find({'user.userId': userId}).sort({ _id: -1 }).exec();
    }
    async findByVehicleId(vehicleId: string): Promise<Reservation[]> {
        return this.reservationModel
            .find({'vehicle.vehicleId': vehicleId})
            .exec();
    }

    async findByDateRange(
        startTimestamp: number,
        endTimestamp: number,
    ): Promise<Reservation[]> {
        return this.reservationModel
            .find({
                $or: [
                    {startDate: {$gte: startTimestamp, $lte: endTimestamp}},
                    {endDate: {$gte: startTimestamp, $lte: endTimestamp}},
                ],
            })
            .exec();
    }

    async findByReservationStatus(
        reservationStatus: string,
    ): Promise<Reservation[]> {
        return this.reservationModel.find({reservationStatus}).exec();
    }

    async updateReservationStatus(
        reservationId: string,
        reservationStatus: ReservationStatus,
    ): Promise<Reservation> {
        return this.reservationModel
            .findByIdAndUpdate(reservationId, {reservationStatus}, {new: true})
            .exec();
    }
}
