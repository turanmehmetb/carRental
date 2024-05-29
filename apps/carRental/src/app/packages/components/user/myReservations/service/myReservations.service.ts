import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Reservation} from '@carRental/models';

import {BaseService} from '../../../../base/base.service';
import {ConfigService} from '../../../../config/config.service';

@Injectable({
    providedIn: 'root',
})
export class MyReservationService extends BaseService<Reservation, string> {
    constructor(
        private readonly http: HttpClient,
        private readonly configService: ConfigService,
    ) {
        super(http, configService.getConfig().apiBaseUrl + '/reservation');
    }

    cancelReservation(reservation: Reservation): Observable<Reservation> {
        return this.http.post<Reservation>(this._base + '/cancelReservation', {
            Reservation: reservation,
        });
    }
}
