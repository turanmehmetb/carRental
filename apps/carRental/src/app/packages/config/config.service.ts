
import {empty as observableEmpty, of as observableOf, Observable, lastValueFrom, EMPTY} from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Config } from './config.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    private loaded = false;
    private configuration: Config;

    constructor(
        private readonly http: HttpClient,
    ) {
    }

    public getConfig(): Config {
        return this.configuration;
    }

    // the return value (Promise) of this method is used as an APP_INITIALIZER,
    // so the application's initialization will not complete until the Promise resolves.
    public load(): Promise<any> {
        const jsonFile = `assets/config/config.${environment.name}.json`;
        if(this.loaded) {
            return lastValueFrom(observableOf(this, this.configuration));
        } else {
            const configurationObservable = this.http.get(jsonFile); // path is relative to that for app's index.html
            configurationObservable.pipe(
                catchError(error => {
                    console.log(`error loading configuration: ${JSON.stringify(error)}`);
                    return EMPTY;
                }))
                .subscribe(config => {
                    this.configuration = config as Config;
                    this.configuration.apiBaseUrl = document.location.protocol + "//" + document.location.hostname
                     + ":" + this.configuration.apiBasePort + "/api"
                    this.loaded = true;
                }
                );
            return lastValueFrom(configurationObservable);
        }
    }

}
