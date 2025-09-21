// src/app/router/app-routing.module.ts
import { Routes } from '@angular/router';
import { ConciertosPage } from './pages/conciertos/conciertos.page';

export const routes: Routes = [
  { path: '', redirectTo: 'conciertos', pathMatch: 'full' },
  { path: 'conciertos', component: ConciertosPage },
  // ruta comodín a conciertos (o a un 404 si lo implementas)
  { path: '**', redirectTo: 'conciertos' }
];
