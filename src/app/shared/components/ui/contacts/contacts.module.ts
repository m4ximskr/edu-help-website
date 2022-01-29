import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactsComponent} from './contacts.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [ContactsComponent],
})
export class ContactsModule { }
