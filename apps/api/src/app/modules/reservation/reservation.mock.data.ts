import {Reservation, ReservationStatus, User, Vehicle} from '@carRental/models';

import {UserMockData} from '../user/user.mock.data';

export class ReservationMockData {
    public static defaultReservations: Reservation[] = [
        {
            user: UserMockData.defaultUsers[0],
            vehicle: {
                db: 1,
                brandName: 'Ford',
                modelName: 'Kuga',
                modelYear: 2024,
                transmissionType: 'auto',
                type: 'car',
                fuelType: 'diesel',
                color: 'black',
                people: 5,
                imgPath: 'assets/images/rentimg.png',
                vehicleId: 'NezA1s9wG5',
            },
            startDate: Date.now(),
            endDate: Date.now() + 86400000, // Adding 24 hours to current date for endDate
            reservationStatus: ReservationStatus.Pending,
        },
        {
            user: UserMockData.defaultUsers[1],
            vehicle: {
                db: 1,
                brandName: 'Peugeot',
                modelName: '408',
                modelYear: 2024,
                transmissionType: 'auto',
                type: 'car',
                fuelType: 'petrol',
                color: 'blue',
                people: 5,
                imgPath: 'assets/images/rentimg2.png',
                vehicleId: 'v9xyYL5xsu',
            },
            startDate: Date.now() - 86400000, // Subtracting 24 hours from current date for startDate
            endDate: Date.now(),
            reservationStatus: ReservationStatus.Confirmed,
        },
        {
            user: UserMockData.defaultUsers[2],
            vehicle: {
                db: 1,
                brandName: 'BMW',
                modelName: 'X1',
                modelYear: 2024,
                transmissionType: 'auto',
                type: 'car',
                fuelType: 'diesel',
                color: 'white',
                people: 5,
                imgPath: 'assets/images/rentimg3.png',
                vehicleId: 'AiyvDKDR4G',
            },
            startDate: Date.now() - 172800000, // Subtracting 48 hours from current date for startDate
            endDate: Date.now() - 86400000, // Subtracting 24 hours from current date for endDate
            reservationStatus: ReservationStatus.Completed,
        },
    ] as Reservation[];
}
