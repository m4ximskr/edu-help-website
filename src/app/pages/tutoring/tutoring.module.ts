import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TutoringComponent} from "./tutoring.component";
import {MatIconModule} from "@angular/material/icon";
import { TutoringOrderFormComponent } from './tutoring-order-form/tutoring-order-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [TutoringComponent, TutoringOrderFormComponent],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatButtonModule
  ],
  exports: [TutoringComponent],
})
export class TutoringModule { }
