import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '@carRental/models';
import { SelectItem } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { LanguageMessagesService } from '../../../util/languageMessagesService';
import { MessageType, SystemMessageService } from '../../../util/message.service';
import { UserService } from '../service/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

    topMenuForNavigation: SelectItem[];
    selectedTopMenuNavigation: string;
    user: User = new User();
    password: string;
    passwordConfirm: string;

    constructor(
        private languageMessagesService: LanguageMessagesService,
        private userService: UserService,
        private messageService: SystemMessageService,
        private titleService: Title, 
    ) { }

    async ngOnInit(): Promise<void> {
        this.titleService.setTitle("CarRental - " + this.languageMessagesService.msgjson.profile);

        this.topMenuForNavigation = [
            { label: this.languageMessagesService.msgjson.settings, value: 'settings', icon: 'pi pi-cog' },
        ];
        this.selectedTopMenuNavigation = this.topMenuForNavigation[0].value;

        this.user = await this.userService.getCurrentUser() as User;

    }

    async savePassword(form: NgForm) {
        const user =  await lastValueFrom(this.userService.changePassword(this.user.email, this.password));
        if(user._id) {
            this.messageService.createMessage(MessageType.success, '', 'passwordChangeSuccesful');
        }
        else {
            form.reset();
            this.messageService.createMessage(MessageType.error, '', 'passwordChangeFailed');
        }
    }

}