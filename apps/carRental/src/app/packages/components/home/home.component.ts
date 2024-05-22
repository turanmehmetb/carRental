import { Component, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { LanguageMessagesService } from "../../util/languageMessagesService";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    startDate: number;
    endDate: number;

    constructor(
        private readonly metaService: Meta, 
        private readonly titleService: Title, 
        private readonly languageMessagesService: LanguageMessagesService,
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle("CarRental - " + this.languageMessagesService.msgjson.home);
    }

    search() {
        console.log(this.startDate);
    }

}