import { Routes } from '@angular/router'
import { _404Component } from './packages/components/404/404.component'
import { HomeComponent } from './packages/components/home/home.component'
import { VehiclesComponent } from './packages/components/vehicles/vehicles.component'
import { UserLoginComponent } from './packages/components/user/login/login.component'
import { UserRegisterComponent } from './packages/components/user/register/register.component'

export const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'vehicles',
        component: VehiclesComponent,
    },
    {
        path: 'login',
        component: UserLoginComponent,
    },
    {
        path: 'register',
        component: UserRegisterComponent,
    },
    {
        path: '**',
        component: _404Component,
        pathMatch: 'full',
    },
]