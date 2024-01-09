import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }, 
                        { path: 'current_weather', loadChildren: () => import('./current/current.module').then(m => m.CurrentModule) },
                        { path: 'weather_forecast', loadChildren: () => import('./forecast/forecast.module').then(m => m.ForecastModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
