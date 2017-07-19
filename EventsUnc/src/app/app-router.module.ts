import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventoComponent }from'./evento/evento.component';
import {AdminComponent}from'./admin/admin.component';
export const routes: Routes = [
    {
        path:"",
        component:EventoComponent
    },
    {
        path:"admin",
        component:AdminComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);