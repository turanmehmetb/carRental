import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { LanguageMessagesService } from "./languageMessagesService";

@Injectable({
    providedIn: 'root'
})
export class NavbarService { 

    loggedIn: boolean = false;
    items: { label: string, url: string }[];
    selectedNavItemUrl: string;

    constructor(
        private readonly languageMessagesService: LanguageMessagesService,
        private readonly router: Router,
    ) {

    }

    initNavbar() {
        this.items = [
            { label: this.languageMessagesService.msgjson.vehicles, url: '/vehicles' },
        ];

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
        this.setNavbarItems();
        this.router.navigateByUrl('/login');
    }

    setNavbarItems() {

        if (!this.loggedIn) {
            this.items.push({ label: this.languageMessagesService.msgjson.register, url: '/register' });
            this.items.push({ label: this.languageMessagesService.msgjson.login, url: '/login' });
        }
        else 
            this.items.push({ label: this.languageMessagesService.msgjson.logout, url: '/logout' });

        this.items.forEach(navbarItem => {
            if ('/' + window.location.href.split('/')[3] === navbarItem.url) {
                this.selectedNavItemUrl = navbarItem.url;
            }
        });
    }

}