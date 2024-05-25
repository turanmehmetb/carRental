import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { LanguageMessagesService } from "../../util/languageMessagesService";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    startDate: Date;
    endDate: Date;

    constructor(
        private readonly router: Router,
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