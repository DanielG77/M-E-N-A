import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Concierto } from '../../../models/concierto.model';
import { ConciertoService } from '../../../core/services/concierto.service';

@Component({
  selector: 'concierto-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './concierto-form.component.html',
  styleUrls: ['./concierto-form.component.scss']
})
export class ConciertoFormComponent implements OnChanges {
  @Input() concierto: Concierto | null = null; // si null -> crear nuevo
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
  
  model: Concierto = { titulo: '', artista: '', fecha: '', lugar: '', precio: 0 };


  constructor(private svc: ConciertoService) {}

  ngOnChanges(changes: SimpleChanges): void {
  if (this.concierto) {
    this.model = { ...this.concierto };
  } else {
    this.model = { titulo: '', artista: '', fecha: '', lugar: '', precio: 0 };
  }
}


  submit() {
    if (this.model._id) {
      this.svc.update(this.model._id, this.model).subscribe(() => this.saved.emit());
    } else {
      this.svc.create(this.model).subscribe(() => this.saved.emit());
    }
  }



  cancel() {
    this.model = { titulo: '', artista: '', fecha: '', lugar: '', precio: 0 };
    this.cancelled.emit();
  }

}
