import { Routes } from '@angular/router'
import { _404Component } from './packages/components/404/404.component'
import { HomeComponent } from './packages/components/home/home.component'
import { VehiclesComponent } from './packages/components/vehicles/vehicles.component'

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
        path: '**',
        component: _404Component,
        pathMatch: 'full',
    },
]