import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

export enum EmailStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum EmailType {
  ORDER = 'order',
  QUESTION = 'question',
  TUTORING = 'tutoring',
}

interface EmailNotification {
  status: EmailStatus,
  type: EmailType,
}

@Component({
  selector: 'email-notification-modal',
  templateUrl: './email-notification.component.html',
  styleUrls: ['./email-notification.component.scss']
})
export class EmailNotificationComponent {

  emailStatus = EmailStatus;

  emailType = EmailType;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EmailNotification,
  ) {
    // console.log(this.data);
  }
}
