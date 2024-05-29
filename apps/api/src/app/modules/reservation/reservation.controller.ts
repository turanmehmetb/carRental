import {Reservation, ReservationStatus} from '@carRental/models';
import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';

import {BaseController} from '../base/base.controller';
import {ReservationService} from './reservation.service';

@Controller('/reservation')
export class ReservationController extends BaseController<Reservation> {
    constructor(private readonly reservationService: ReservationService) {
        super(reservationService);
    }

    @Post('/findByUserId')
    findByUserId(@Body('userId') userId: string): Promise<Reservation[]> {
        return this.reservationService.findByUserId(userId);
    }

    @Post('/findByVehicleId')
    findByVehicleId(
        @Body('vehicleId') vehicleId: string,
    ): Promise<Reservation[]> {
        return this.reservationService.findByVehicleId(vehicleId);
    }

    @Post('/findByDateRange')
    findByDateRange(
        @Body() dates: {startTimestamp: number; endTimestamp: number},
    ): Promise<Reservation[]> {
        return this.reservationService.findByDateRange(
            dates.startTimestamp,
            dates.endTimestamp,
        );
    }

    @Post('/findByStatus')
    findByReservationStatus(
        @Body() statusObject: {reservationStatus: ReservationStatus},
    ): Promise<Reservation[]> {
        const statusString = statusObject.reservationStatus;
        return this.reservationService.findByReservationStatus(statusString);
    }

    // Inside the controller:
    @Put('/updateStatus/:id')
    updateReservationStatus(
        @Param('id') reservationId: string,
        @Body() statusObject: {reservationStatus: ReservationStatus},
    ): Promise<Reservation> {
        const {reservationStatus} = statusObject;
        return this.reservationService.updateReservationStatus(
            reservationId,
            reservationStatus,
        );
    }

    @Delete('/:id')
    deleteReservation(@Param('id') id: string): Promise<Reservation> {
        return this.reservationService.delete(id);
    }

    @Post('/cancelReservation')
    cancelReservation(
        @Body('Reservation') reservation: Reservation,
    ): Promise<Reservation> {
        return this.reservationService.cancelReservation(reservation._id);
    }
}
