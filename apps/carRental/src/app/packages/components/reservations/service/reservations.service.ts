import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Reservation, Vehicle } from "@carRental/models";
import { BaseService } from "../../../base/base.service";
import { ConfigService } from "../../../config/config.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ReservationService extends BaseService<Reservation, string> {
    
    constructor(private readonly http: HttpClient, private readonly configService: ConfigService) {
        super(http, configService.getConfig().apiBaseUrl + '/reservation');
    }

    findAvailableVehiclesByDateRange(start: number, end: number): Observable<Vehicle[]> {
        return this.http.post<Vehicle[]>(this._base + '/findAvailableVehiclesByDateRange', { startTimestamp: start, endTimestamp: end });
    }
}