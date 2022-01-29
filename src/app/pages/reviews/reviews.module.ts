import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReviewsComponent} from './reviews.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CarouselModule} from '../../shared/components/ui/carousel/carousel.module';

@NgModule({
  declarations: [ReviewsComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    CarouselModule,
  ],
  exports: [ReviewsComponent],
})
export class ReviewsModule { }
