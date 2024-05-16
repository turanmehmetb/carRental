import {BaseModel} from '../base.model';
import {User} from '../user/user.model';
import {Vehicle} from '../vehicle/vehicle.model';
import {ReservationStatus} from './reservation-status.enum';

export class Reservation extends BaseModel {
    user: User;
    vehicle: Vehicle;
    startDate: number;
    endDate: number;
    reservationStatus: ReservationStatus;
}
