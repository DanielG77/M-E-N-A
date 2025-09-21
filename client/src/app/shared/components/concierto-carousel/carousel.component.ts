import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConciertoService } from '../../../core/services/concierto.service';
import { Concierto } from '../../../models/concierto.model';

@Component({
  selector: 'concierto-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {

  conciertos: Concierto[] = [];
  currentIndex = 0;
  loading = false;
  error: string | null = null;
  private autoPlayInterval: any;

  constructor(private conciertoService: ConciertoService) {}

  ngOnInit(): void {
    this.loadConciertos();
  }

  ngOnDestroy(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  private loadConciertos(): void {
    this.loading = true;
    this.error = null;

    this.conciertoService.list().subscribe({
      next: (data) => {
        this.conciertos = data;
        this.loading = false;
        if (this.conciertos.length > 0) {
          this.startAutoPlay();
        }
      },
      error: (err) => {
        this.error = 'Error cargando conciertos';
        console.error(err);
        this.loading = false;
      }
    });
  }

  prev(): void {
    this.currentIndex = (this.currentIndex === 0) 
      ? this.conciertos.length - 1 
      : this.currentIndex - 1;
  }

  next(): void {
    this.currentIndex = (this.currentIndex === this.conciertos.length - 1) 
      ? 0 
      : this.currentIndex + 1;
  }

  setCurrentIndex(index: number): void {
    this.currentIndex = index;
  }

  private startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, 5000);
  }
}
