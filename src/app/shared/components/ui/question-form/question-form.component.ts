import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SendMailService} from '../../../services/send-mail.service';
import {MatDialog} from '@angular/material/dialog';
import {EmailNotificationComponent, EmailStatus, EmailType} from '../../modals/email-notification/email-notification.component';
import {NoopScrollStrategy} from '@angular/cdk/overlay';

@Component({
  selector: 'edu-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  questionForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private sendMailService: SendMailService,
              private dialog: MatDialog) {
    this.createForm();
  }

  ngOnInit() {
  }

  get getEmailErrorMessage(): string {
    const emailControl = this.questionForm.controls.email;
    if (emailControl.hasError('required')) {
      return 'Šis lauks ir obligāts';
    } else if (emailControl.hasError('email')) {
      return 'Nepareizs email';
    } else {
      return '';
    }
  }

  get getQuestionErrorMessage(): string {
    const questionControl = this.questionForm.controls.question;
    if (questionControl.hasError('required')) {
      return 'Šis lauks ir obligāts';
    } else {
      return '';
    }
  }

  sendMail() {
    if (this.questionForm.valid) {
      this.sendMailService.sendQuestionMail(this.questionForm.value).subscribe(res => {
        this.createNotificationModal(EmailStatus.SUCCESS);
      }, err => {
        this.createNotificationModal(EmailStatus.ERROR);
      });
    } else {
      this.questionForm.markAsTouched();
    }
  }

  private createForm() {
    this.questionForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      question: ['', [Validators.required, Validators.maxLength(256)]],
    });
  }

  private createNotificationModal(status: EmailStatus) {
    this.dialog.open(EmailNotificationComponent, {
      scrollStrategy: new NoopScrollStrategy(),
      data: {
        status,
        type: EmailType.QUESTION,
      }
    });
  }

}
