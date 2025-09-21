import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Concierto } from '../../../models/concierto.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'concierto-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './concierto-card.component.html',
  styleUrls: ['./concierto-card.component.scss']
})
export class ConciertoCardComponent {
  @Input() concierto!: Concierto;
  @Output() edit = new EventEmitter<Concierto>();
  @Output() delete = new EventEmitter<string>();

  onEdit() {
    this.edit.emit(this.concierto);
  }

  async onDelete() {
    this.delete.emit(this.concierto._id!);
  }
}
