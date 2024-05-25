import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Reservation, User, Vehicle } from "@carRental/models";
import { ConfirmationService } from "primeng/api";
import { LanguageMessagesService } from "../../util/languageMessagesService";
import { MessageType, SystemMessageService } from "../../util/message.service";
import { UserService } from "../user/service/user.service";
import { VehicleService } from "../vehicles/service/vehicle.service";
import { ReservationService } from "./service/reservations.service";

@Component({
    selector: 'app-reservations',
    templateUrl: './reservations.component.html',
})
export class ReservationsComponent implements OnInit {

    vehicles: Vehicle[];
    startDate: Date;
    endDate: Date;
    loggedIn = false;
    isSidebarVisible = false;

    constructor(
        private readonly vehicleService: VehicleService,
        private readonly reservationService: ReservationService,
        private readonly userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: SystemMessageService,
        private readonly titleService: Title, 
        private readonly languageMessagesService: LanguageMessagesService,
        private datePipe: DatePipe,
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle("CarRental - " + this.languageMessagesService.msgjson.reservation);
        this.route.paramMap.subscribe(params => {
            const start = Number(params.get('startDate'));
            const end = Number(params.get('endDate'));
            this.startDate = new Date(start);
            this.endDate = new Date(end);
            if(start && end)
              this.vehicleService.findAvailableVehiclesByDateRange(start, end).subscribe(res => {
                  this.vehicles = res;
              });
        });

        this.loggedIn = this.userService.isLoggedIn();
    }

    makeReservation(vehicle: Vehicle) {
        this.confirmationService.confirm({
            message: `
            ${this.languageMessagesService.msgjson.reservationInfo} <br/>
            ${this.languageMessagesService.msgjson.vehicle}: ${vehicle.brandName} ${vehicle.modelName} - ${this.languageMessagesService.msgjson[vehicle.fuelType]} ${this.languageMessagesService.msgjson[vehicle.transmissionType]} <br/>
            ${this.languageMessagesService.msgjson.date}: ${this.datePipe.transform(this.startDate, 'dd/MM/YYYY HH:MM')} - ${this.datePipe.transform(this.endDate, 'dd/MM/YYYY HH:MM')}
            `,
            header: `${this.languageMessagesService.msgjson.reservation} - ${vehicle.brandName} ${vehicle.modelName}`,
            acceptLabel: this.languageMessagesService.msgjson.yes,
            rejectLabel: this.languageMessagesService.msgjson.no,
            icon: 'pi pi-exclamation-triangle',
            rejectButtonStyleClass:"p-button-text",
            accept: async () => {
                const reservation = new Reservation();
                reservation.startDate = this.startDate.getTime();
                reservation.endDate = this.endDate.getTime();
                reservation.vehicle = vehicle;
                reservation.user = await this.userService.getCurrentUser() as User;
                this.reservationService.save(reservation).subscribe(result => {
                    if(result) {
                        this.messageService.createMessage(MessageType.success, '', 'reservationSuccessful');
                        setTimeout(() => {
                            this.router.navigateByUrl('myReservations');
                        }, 3000);
                    }
                    else
                        this.messageService.createMessage(MessageType.error, '', 'reservationFailed');

                });
            }
        });
    }

    search() {
        this.vehicleService.findAvailableVehiclesByDateRange(this.startDate.getTime(), this.endDate.getTime()).subscribe(res => {
            this.vehicles = res;
            this.isSidebarVisible = false;
        });
    }

}