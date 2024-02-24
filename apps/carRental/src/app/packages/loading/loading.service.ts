import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LoadingService { 

    isLoading = false;
    withSpinner = false;

    constructor() {

    }

    loading(withSpinner: boolean = false) {
        this.isLoading = true;
        this.withSpinner = withSpinner;
        document.body.addEventListener('wheel', this.preventScroll, {passive: false});
    }
    
    loaded() {
        this.isLoading = false;
        document.body.removeEventListener('wheel', this.preventScroll)
    }

    preventScroll(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }


}