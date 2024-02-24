import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { LanguageMessagesService } from "./languageMessagesService";

@Injectable({
    providedIn: 'root'
})
export class SystemMessageService { 
    
    constructor(
        private readonly messageService: MessageService, 
        private readonly languageMessagesService: LanguageMessagesService,
    ) {}

    createMessage(severity: MessageType, summary: string, detail: string) {
        this.messageService.add({
            severity, 
            summary: this.languageMessagesService.msgjson[summary] ?? summary, 
            detail: this.languageMessagesService.msgjson[detail] ?? detail, 
            key: 'toastKey',
            life: 3000,
        });
    }
}

export enum MessageType {
    success="success",
    error="error",
    info="error",
    warn="warn"
}