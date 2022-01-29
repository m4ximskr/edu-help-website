import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderFormComponent} from './order-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {RouterModule} from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import {EmailNotificationModule} from '../../modals/email-notification/email-notification.module';
import {FileAttachmentModule} from '../form/file-attachment/file-attachment.module';

@NgModule({
  declarations: [OrderFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatDividerModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
    FileAttachmentModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    EmailNotificationModule,
    RouterModule
  ],
  exports: [OrderFormComponent]
})
export class OrderFormModule { }
