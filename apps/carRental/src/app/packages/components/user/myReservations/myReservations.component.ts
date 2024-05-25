import { Component, OnInit } from '@angular/core';
import { Reservation, User } from '@carRental/models';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { LanguageMessagesService } from '../../../util/languageMessagesService';
import { MessageType, SystemMessageService } from '../../../util/message.service';
import { ReservationService } from '../../reservations/service/reservations.service';
import { UserService } from '../service/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-myReservations',
  templateUrl: './myReservations.component.html',
})
export class MyReservationsComponent implements OnInit {

    topMenuForNavigation: SelectItem[];
    selectedTopMenuNavigation: string;
    user: User = new User();
    reservations: Reservation[] = [];

    constructor(
        private languageMessagesService: LanguageMessagesService,
        private userService: UserService,
        private reservationService: ReservationService,
        private messageService: SystemMessageService,
        private confirmationService: ConfirmationService,
        private titleService: Title, 
    ) { }

    async ngOnInit(): Promise<void> {
        this.titleService.setTitle("CarRental - " + this.languageMessagesService.msgjson.myReservations);

        this.topMenuForNavigation = [
            { label: this.languageMessagesService.msgjson.settings, value: 'settings', icon: 'pi pi-cog' },
        ];
        this.selectedTopMenuNavigation = this.topMenuForNavigation[0].value;

        this.user = await this.userService.getCurrentUser() as User;
        this.reservationService.findByUserId(this.user.userId).subscribe(res => this.reservations = res);
    }

    async cancelReservation(reservation: Reservation) {
        this.confirmationService.confirm({
            message: this.languageMessagesService.msgjson.reservationCancel,
            header: this.languageMessagesService.msgjson.reservation,
            acceptLabel: this.languageMessagesService.msgjson.yes,
            rejectLabel: this.languageMessagesService.msgjson.no,
            icon: 'pi pi-exclamation-triangle',
            rejectButtonStyleClass:"p-button-text",
            accept: async () => {
                this.reservationService.save(reservation).subscribe(result => {
                    if(result) 
                        this.messageService.createMessage(MessageType.success, '', 'reservationCancelSuccessful');
                    else
                        this.messageService.createMessage(MessageType.error, '', 'reservationCancelFailed');
                });
            }
        });
    }

}