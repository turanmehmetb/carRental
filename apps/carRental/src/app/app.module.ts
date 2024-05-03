// angular
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

// local
import { AppComponent } from './app.component';
import { HomeComponent } from './packages/components/home/home.component';
import { ConfigService } from './packages/config/config.service';
import { SharedModule } from './packages/modules/shared.module';
import { appRoutes } from './routes';


// ngx
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfirmationService } from 'primeng/api';
import { AuthInterceptor } from './packages/auth/auth.interceptor';
import { _404Component } from './packages/components/404/404.component';
import { ErrorInterceptor } from './packages/error/error.interceptor';
import { LoadingInterceptor } from './packages/loading/loading.interceptor';
import { VehiclesComponent } from './packages/components/vehicles/vehicles.component';
import { UserLoginComponent } from './packages/components/user/login/login.component';
import { UserRegisterComponent } from './packages/components/user/register/register.component';
import { ProfileComponent } from './packages/components/user/profile/profile.component';

export function configurationServiceInitializerFactory(configurationService: ConfigService): Function {
  // a lambda is required here, otherwise `this` won't work inside ConfigurationService::load
  return () => configurationService.load()
}

export function LanguageFactory(): string {
  return localStorage.getItem('locale') || 'tr';
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VehiclesComponent,
    UserLoginComponent,
    UserRegisterComponent,
    ProfileComponent,
    _404Component,
  ],
  imports: [
    CommonModule,
    BrowserModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(appRoutes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: configurationServiceInitializerFactory, deps: [ConfigService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: LOCALE_ID, useFactory: LanguageFactory },
    Meta,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}
