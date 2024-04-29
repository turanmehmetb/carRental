import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { LanguageMessagesService } from "./languageMessagesService";
import { UserService } from "../components/user/service/user.service";


@Injectable({
    providedIn: 'root'
})
export class NavbarService { 

    loggedIn: boolean = false;
    items: { label: string, url: string }[];
    initItems: { label: string, url: string }[];
    selectedNavItemUrl: string;
    avatarItems: { label: string, url: string }[];

    constructor(
        private readonly languageMessagesService: LanguageMessagesService,
        private readonly userService: UserService,
        private readonly router: Router,
    ) {

    }

    initNavbar() {
        this.initItems = [
            { label: this.languageMessagesService.msgjson.home, url: '/' },
            { label: this.languageMessagesService.msgjson.vehicles, url: '/vehicles' },
        ];

        this.items = [];
        this.avatarItems = [{ label: this.languageMessagesService.msgjson.logout, url: '/logout' }];
        this.userService.loginState.subscribe((val =>{ 
            this.loggedIn = val;
        }));

        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                if(val.url === '/logout') this.onLogout();
                // if (val.url === '/login') this.onLogin();
                this.selectedNavItemUrl = val.url
            }
        });

        this.setNavbarItems();
    }

    onLogout() {
        this.userService.logout();
        this.setNavbarItems();
        this.router.navigateByUrl('/login');
    }

    setNavbarItems() {
        if (!this.loggedIn) {
            this.items = this.initItems.concat([
                { label: this.languageMessagesService.msgjson.register, url: '/register' },
                { label: this.languageMessagesService.msgjson.login, url: '/login' }
            ]);
        }
        else {
            this.items = this.initItems;
        }

        this.items.forEach(navbarItem => {
            if ('/' + window.location.href.split('/')[3] === navbarItem.url) {
                this.selectedNavItemUrl = navbarItem.url;
            }
        });
    }

}