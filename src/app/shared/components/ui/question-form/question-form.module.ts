import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuestionFormComponent} from './question-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {EmailNotificationModule} from '../../modals/email-notification/email-notification.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [QuestionFormComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        EmailNotificationModule,
        RouterModule,
    ],
  exports: [QuestionFormComponent],
})
export class QuestionFormModule { }
