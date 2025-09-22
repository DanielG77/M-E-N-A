import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'concierto-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './concierto-form.component.html',
  styleUrls: ['./concierto-form.component.scss']
})
export class ConciertoFormComponent implements OnInit {
  conciertoForm: FormGroup;
  isEditing = false;
  conciertoId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.conciertoForm = this.createForm();
  }

  ngOnInit() {
    // Verificar si estamos editando (hay ID en la ruta)
    this.conciertoId = this.route.snapshot.paramMap.get('id');
    this.isEditing = !!this.conciertoId;

    if (this.isEditing) {
      this.loadConciertoData();
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      fecha: ['', Validators.required],
      lugar: ['', Validators.required],
      descripcion: [''],
      precio: ['', [Validators.required, Validators.min(0)]],
      imagen: ['']
    });
  }

  private loadConciertoData() {
    // Aquí cargarías los datos del concierto desde tu servicio
    // Por ahora, simulamos datos de ejemplo
    if (this.conciertoId) {
      // Ejemplo de datos - reemplaza con tu servicio real
      const mockConcierto = {
        nombre: 'Concierto de Ejemplo',
        fecha: '2024-12-31',
        lugar: 'Auditorio Nacional',
        descripcion: 'Un concierto increíble',
        precio: 50,
        imagen: 'https://ejemplo.com/imagen.jpg'
      };
      
      this.conciertoForm.patchValue(mockConcierto);
    }
  }

  onSubmit() {
    if (this.conciertoForm.valid) {
      const conciertoData = this.conciertoForm.value;
      
      if (this.isEditing) {
        console.log('Actualizando concierto:', conciertoData);
        // Aquí llamarías a tu servicio de actualización
        // this.conciertoService.update(this.conciertoId, conciertoData).subscribe(...)
      } else {
        console.log('Creando concierto:', conciertoData);
        // Aquí llamarías a tu servicio de creación
        // this.conciertoService.create(conciertoData).subscribe(...)
      }
      
      // Redirigir después de guardar
      this.router.navigate(['/conciertos']);
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel() {
    this.router.navigate(['/conciertos']);
  }

  private markFormGroupTouched() {
    Object.keys(this.conciertoForm.controls).forEach(key => {
      this.conciertoForm.get(key)?.markAsTouched();
    });
  }

  // Helper para acceder fácilmente a los controles en el template
  get f() {
    return this.conciertoForm.controls;
  }
}