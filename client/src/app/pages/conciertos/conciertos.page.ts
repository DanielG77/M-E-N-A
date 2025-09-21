import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../../shared/components/concierto-list/list.component';
import { CarouselComponent } from '../../shared/components/concierto-carousel/carousel.component';

@Component({
  selector: 'app-conciertos-page',
  standalone: true,
  imports: [
    CommonModule, 
    ListComponent, 
    CarouselComponent],
  templateUrl: './conciertos.page.html'
})
export class ConciertosPage {

}
