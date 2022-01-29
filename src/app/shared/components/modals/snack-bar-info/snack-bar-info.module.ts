import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SnackBarInfoComponent} from './snack-bar-info.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [SnackBarInfoComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [SnackBarInfoComponent]
})
export class SnackBarInfoModule { }
