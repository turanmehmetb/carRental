import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { User } from "@carRental/models";
import { MenuItem, SelectItem } from "primeng/api";
import { lastValueFrom } from "rxjs";
import { LanguageMessagesService } from "../../../util/languageMessagesService";
import { UserService } from "../service/user.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class UserRegisterComponent implements OnInit{

    constructor(
        private readonly userService: UserService,
        private readonly languageMessagesService: LanguageMessagesService,
        private readonly router: Router,
        private readonly titleService: Title,
    ) { }

    user: User = new User();
    selectableGrades: SelectItem[] = [];
    passwordConfirm: string;
    stepItems: MenuItem[];
    activeStep: number = 0;

    ngOnInit(): void {
        
        this.titleService.setTitle("Car Rental - " + this.languageMessagesService.msgjson.register);

        this.stepItems = [
            { label: this.languageMessagesService.msgjson.userInfo },
            { label: this.languageMessagesService.msgjson.credentials }
        ];

        if(history.state?.user) {
            this.user = history.state.user;
        }

        this.userService.loginState.subscribe((val =>{ 
            if(val) 
                this.router.navigateByUrl('/');
        }));

    }

    async onSubmit() {
        const user = await lastValueFrom(this.userService.register(this.user));
        if(user) {
            this.router.navigateByUrl('/');
        }
    }

    onLogin() {
        this.router.navigateByUrl('/login');
    }

    onStepPrev() {
        this.activeStep -= 1;
    }

    onStepNext() {
        this.activeStep += 1;
    }

}