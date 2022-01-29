import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WarrantiesComponent} from './warranties.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ContactsModule} from '../../shared/components/ui/contacts/contacts.module';

@NgModule({
  declarations: [WarrantiesComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ContactsModule,
  ],
  exports: [WarrantiesComponent],
})
export class WarrantiesModule { }
