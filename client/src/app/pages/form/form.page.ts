import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConciertoFormComponent } from '../../shared/components/concierto-form/concierto-form.component';

@Component({
  selector: 'app-concierto-form-page',
  standalone: true,
  imports: [CommonModule, ConciertoFormComponent],
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss']
})
export class ConciertoFormPage {
}