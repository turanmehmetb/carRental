import { Routes } from '@angular/router'
import { _404Component } from './packages/components/404/404.component'
import { HomeComponent } from './packages/components/home/home.component'

export const appRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: '**',
        component: _404Component,
        pathMatch: 'full',
    },
]