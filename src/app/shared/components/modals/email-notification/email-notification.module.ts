import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmailNotificationComponent} from './email-notification.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    declarations: [EmailNotificationComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
    ],
    exports: [EmailNotificationComponent]
})
export class EmailNotificationModule { }
