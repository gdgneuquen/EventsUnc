import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventoComponent }from'./evento/evento.component';
import {AdminComponent}from'./admin/admin.component';
import {MainComponent}from'./main/main.component';
import {modEvento}from'./modEvento/modEvento.component';
import {PageNotFoundComponent} from './notfound/page.not.found.component';
import {NotificacionesComponent} from './notificaciones/notificaciones.component';

export const routes: Routes = [
    { path:'',  pathMatch: 'full',  component:MainComponent  },
    { path:'main',  component:MainComponent  },
    { path:"admin",  component:AdminComponent  },
    { path:"event", component:EventoComponent },
    { path:"modEvento/:_id", component:modEvento },
<<<<<<< HEAD
    { path:"notificaciones",   component:NotificacionesComponent   },
    { path: '**', component: PageNotFoundComponent }//cualquier url que no encuentre

=======
    { path:"notificaciones",   component:NotificacionesComponent},
    { path: '**', component: PageNotFoundComponent }//cualquier url que no encuentre
>>>>>>> e1139c19143ac9019be4ffc592e32e0a0e570552
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);