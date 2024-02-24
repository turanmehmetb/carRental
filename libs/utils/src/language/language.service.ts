const enjson = require('libs/models/src/language/en.json')
const trjson = require('libs/models/src/language/tr.json')

export class LanguageService {
  getMessages(lang: string): { messages: { [key: string]: string } } {
    let msgjson
    if (lang == 'en') {
      msgjson = enjson.messages
    } else if (lang == 'tr') {
      msgjson = trjson.messages
    }
    return msgjson
  }
}
