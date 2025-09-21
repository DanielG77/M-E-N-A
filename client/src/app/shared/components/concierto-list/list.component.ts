import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConciertoService } from '../../../core/services/concierto.service';
import { Concierto } from '../../../models/concierto.model';
import { ConciertoCardComponent } from '../concierto-card/concierto-card.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'concierto-list',
  standalone: true,
  imports: [CommonModule, ConciertoCardComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  // Declaraciones
  conciertos: Concierto[] = [];
  loading = false;
  error: string | null = null;
  editing: Concierto | null = null;

  constructor(private conciertoService: ConciertoService) { }

  ngOnInit(): void {
    this.loadConciertos();
  }

  // Carga la lista de conciertos
  loadConciertos(): void {
    this.loading = true;
    this.error = null;

    this.conciertoService.list().subscribe({
      next: data => {
        this.conciertos = data;
        this.loading = false;
      },
      error: err => {
        this.error = 'Error cargando conciertos';
        console.error(err);
        this.loading = false;
      }
    });
  }

  trackByConcierto(index: number, concierto: Concierto): string {
  return concierto._id ?? index.toString();
  }

  // Editar un concierto
  onEdit(concierto: Concierto): void {
    this.editing = { ...concierto };
  
  }

 
  onRemove(id: string | undefined): void {
    if (!id) {
      Swal.fire('Error', 'El concierto no tiene ID válido.', 'error');
      return;
    }

    Swal.fire({
      title: '¿Seguro que quieres eliminar este concierto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.conciertoService.delete(id).subscribe({
          next: () => {
            Swal.fire('Eliminado!', 'El concierto ha sido eliminado.', 'success');
            this.loadConciertos();
          },
          error: err => {
            Swal.fire('Error', 'No se pudo eliminar el concierto.', 'error');
            console.error(err);
          }
        });
      }
    });
  }


  /////////// Nuevo concierto //////////////////////////////////////////////////////////////
  onNew(): void {
    
      // EnConstruccion
  }
}
