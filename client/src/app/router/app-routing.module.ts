import { Routes } from '@angular/router';
import { ConciertosPage } from '../pages/conciertos/conciertos.page';
import { ConciertoFormPage } from '../pages/form/form.page';

export const routes: Routes = [
  { path: '', redirectTo: 'conciertos', pathMatch: 'full' },
  { path: 'conciertos', component: ConciertosPage },
  { path: 'conciertos/crear', component: ConciertoFormPage },
  { path: 'conciertos/editar/:id', component: ConciertoFormPage }
];