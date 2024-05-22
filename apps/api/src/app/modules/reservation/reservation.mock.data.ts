import {Reservation, ReservationStatus, User, Vehicle} from '@carRental/models';

import {UserMockData} from '../user/user.mock.data';
import {VehicleMockData} from '../vehicle/vehicle.mock.data';

export class ReservationMockData {
    public static defaultReservations: Reservation[] = [
        {
            user: UserMockData.defaultUsers[0],
            vehicle: VehicleMockData.defaultVehicles[0],
            startDate: Date.now(),
            endDate: Date.now() + 86400000, // Adding 24 hours to current date for endDate
            reservationStatus: ReservationStatus.Pending,
        },
        {
            user: UserMockData.defaultUsers[1],
            vehicle: VehicleMockData.defaultVehicles[1],
            startDate: Date.now() - 86400000, // Subtracting 24 hours from current date for startDate
            endDate: Date.now(),
            reservationStatus: ReservationStatus.Confirmed,
        },
        {
            user: UserMockData.defaultUsers[2],
            vehicle: VehicleMockData.defaultVehicles[3],
            startDate: Date.now() - 172800000, // Subtracting 48 hours from current date for startDate
            endDate: Date.now() - 86400000, // Subtracting 24 hours from current date for endDate
            reservationStatus: ReservationStatus.Completed,
        },
    ] as Reservation[];
}
