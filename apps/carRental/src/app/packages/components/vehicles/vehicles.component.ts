import { Component, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { Vehicle } from "@carRental/models";
import { LanguageMessagesService } from "../../util/languageMessagesService";
import { VehicleService } from "./service/vehicle.service";

@Component({
    selector: 'app-vehicles',
    templateUrl: './vehicles.component.html',
})
export class VehiclesComponent implements OnInit {

    vehicles: Vehicle[];

    constructor(
        private readonly vehicleService: VehicleService,
        private readonly metaService: Meta, 
        private readonly titleService: Title, 
        private readonly languageMessagesService: LanguageMessagesService,
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle("CarRental - " + this.languageMessagesService.msgjson.vehicles);

        this.vehicleService.findAll().subscribe(res => {
            this.vehicles = res;
        });
    }

}