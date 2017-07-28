import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventoComponent }from'./evento/evento.component';
import {AdminComponent}from'./admin/admin.component';
import {MainComponent}from'./main/main.component';
import {modEvento}from'./modEvento/modEvento.component';

export const routes: Routes = [
    {
        path:"",
        component:MainComponent
    },
    {
        path:"admin",
        component:AdminComponent
    },
    {
        path:"event",
        component:EventoComponent
    },
    {   path:"modEvento/:_id",
        component:modEvento
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);