import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    //Angular Interceptor-HttpClient problemi yuzunden tokenlar direk localStoragedan cekildi
    //https://github.com/angular/angular/issues/18224
    
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('noauth')) {
            return next.handle(req);
        } else {
            const token = localStorage.getItem('studentToken') ? localStorage.getItem('studentToken') : localStorage.getItem('instructorToken'); 
            if(token) {
                const cloned = req.clone({
                    headers: req.headers.set("Authorization",
                        "Bearer " + token)
                });
                
                 return next.handle(cloned);
            }
            else return next.handle(req);
        }
    }
}
