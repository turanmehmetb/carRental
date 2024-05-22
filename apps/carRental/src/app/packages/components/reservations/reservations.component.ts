import { Component, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { Vehicle } from "@carRental/models";
import { LanguageMessagesService } from "../../util/languageMessagesService";
import { ReservationService } from "./service/reservations.service";
import { VehicleService } from "../vehicles/service/vehicle.service";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs";

@Component({
    selector: 'app-reservations',
    templateUrl: './reservations.component.html',
})
export class ReservationsComponent implements OnInit {

    vehicles: Vehicle[];

    constructor(
        private readonly vehicleService: VehicleService,
        private readonly reservationService: ReservationService,
        private route: ActivatedRoute,
        private readonly metaService: Meta, 
        private readonly titleService: Title, 
        private readonly languageMessagesService: LanguageMessagesService,
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle("CarRental - " + this.languageMessagesService.msgjson.reservations);
        this.route.paramMap.subscribe(params => {
            const start = Number(params.get('startDate'));
            const end = Number(params.get('endDate'));
            if(start && end)
              this.vehicleService.findAvailableVehiclesByDateRange(start, end).subscribe(res => {
                  this.vehicles = res;
              });
        });
    }

}