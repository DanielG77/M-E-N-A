import { Routes } from '@angular/router';
import { ConciertosPage } from '../pages/conciertos/conciertos.page';

export const routes: Routes = [
  { path: '', redirectTo: 'conciertos', pathMatch: 'full' },
  { path: 'conciertos', component: ConciertosPage },
];
