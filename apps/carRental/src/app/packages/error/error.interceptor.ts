import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { MessageType, SystemMessageService } from '../util/message.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private readonly messageService: SystemMessageService,
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMsg = '';
                    if (error.error instanceof ErrorEvent) {
                        errorMsg = `Error: ${error.error.message}`;
                    } else {
                        errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                        this.messageService.createMessage(MessageType.error, '', error.error.message)
                    }
                    // console.log(error);
                    return throwError(() => new Error(errorMsg));
                })
            )
    }
}