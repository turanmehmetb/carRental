import { enjson, trjson } from "libs/models/src/language/language";

export class LanguageService {
    getMessages(lang: string): {messages: {[key: string]: string}} {
        let msgjson;
        if (lang == 'en') {
            msgjson = enjson.messages;
        } else if (lang == 'tr') {
            msgjson = trjson.messages;
        }
        return msgjson;
    }
}
