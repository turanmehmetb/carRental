import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Vehicle } from "@carRental/models";
import { BaseService } from "../../../base/base.service";
import { ConfigService } from "../../../config/config.service";

@Injectable({
    providedIn: 'root'
})
export class VehicleService extends BaseService<Vehicle, string> {
    
    constructor(private readonly http: HttpClient, private readonly configService: ConfigService) {
        super(http, configService.getConfig().apiBaseUrl + '/vehicle');
    }

}