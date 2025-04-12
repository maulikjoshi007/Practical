import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'trip',
        loadChildren:() => import('../app/trip/trip.module').then((m)=>m.TripModule)
    },
    {
        path:'',
        pathMatch:'full',
        redirectTo:'trip'
    }
];
