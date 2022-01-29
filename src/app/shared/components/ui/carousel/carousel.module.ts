import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarouselComponent} from "./carousel.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ZoomedInImageModule} from '../../modals/zoomed-in-image/zoomed-in-image.module';

@NgModule({
  declarations: [CarouselComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    ZoomedInImageModule,
  ],
  exports: [CarouselComponent]
})
export class CarouselModule { }
