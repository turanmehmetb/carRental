import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "@carRental/models";
import { UserService } from "../service/user.service";
import { NavbarService } from "../../../util/navbar.service";
import { LanguageMessagesService } from "../../../util/languageMessagesService";
import { Title } from "@angular/platform-browser";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class UserLoginComponent implements OnInit{

    constructor(
        private readonly userService: UserService,
        private readonly router: Router,
        private readonly navbarService: NavbarService,
        private readonly titleService: Title,
        private readonly languageMessagesService: LanguageMessagesService,
    ) { }

    user: User = new User();

    ngOnInit(): void {     
        this.titleService.setTitle("Car Rental - " + this.languageMessagesService.msgjson.login);

        if(this.userService.loginState.value) 
            this.router.navigateByUrl('/'); 
    }

    login(email: string, password: string = '') {
        const user = new User();
        user.email = email;
        user.password = password;

        this.userService.login(user).subscribe(async tokens => {
            if(tokens) {
                this.userService.setToken(tokens.accessToken);
                this.userService.setUserId(tokens.userId)
                this.router.navigateByUrl('/');
                this.navbarService.setNavbarItems();
            }
            else 
                this.user.password = '';
            
        }
        );
    }

        
    onSubmit(form: NgForm) {
        this.login(form.value.email, form.value.password);
    }


    onRegister() {
        this.router.navigateByUrl('/register');
    }

}