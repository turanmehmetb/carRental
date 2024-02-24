import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Location } from '@angular/common';

@Component({
    selector: 'app-404',
    templateUrl: './404.component.html',
})
export class _404Component implements OnInit {


    constructor(
        private readonly titleService: Title,
        private readonly _location: Location,
    ) {}


    ngOnInit(): void {
        this.titleService.setTitle("CarRental");
    }

    goBack() {
        this._location.back();
    }

}