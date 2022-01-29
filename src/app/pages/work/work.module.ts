import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WorkComponent} from './work.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {ContactsModule} from '../../shared/components/ui/contacts/contacts.module';

@NgModule({
  declarations: [WorkComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    ContactsModule
  ],
  exports: [WorkComponent],
})
export class WorkModule { }
