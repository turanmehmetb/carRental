import { Component, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { LanguageMessagesService } from "../../util/languageMessagesService";
import { VehicleService } from "../vehicles/service/vehicle.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    startDate: Date;
    endDate: Date;

    constructor(
        private readonly router: Router,
        private readonly metaService: Meta, 
        private readonly titleService: Title, 
        private readonly languageMessagesService: LanguageMessagesService,
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle("CarRental - " + this.languageMessagesService.msgjson.home);
    }

    search() {
        this.router.navigate(['/reservations', { startDate: this.startDate.getTime(), endDate: this.endDate.getTime() }]); 
    }

}