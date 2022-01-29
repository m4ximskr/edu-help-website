import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ZoomedInImageComponent} from './zoomed-in-image.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [ZoomedInImageComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  exports: [ZoomedInImageComponent],
})
export class ZoomedInImageModule { }
