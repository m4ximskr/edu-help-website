import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators} from "@angular/forms";
import {SendMailService} from '../../../services/send-mail.service';
import {MatDialog} from '@angular/material/dialog';
import {EmailNotificationComponent, EmailStatus, EmailType} from '../../modals/email-notification/email-notification.component';
import {NoopScrollStrategy} from '@angular/cdk/overlay';
import {RequestQuestionData} from "../../../interfaces/request-data";

interface QuestionForm {
  email: FormControl<string>;
  question: FormControl<string>;
}
@Component({
  selector: 'edu-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  questionForm: FormGroup<QuestionForm>;

  constructor(private formBuilder: UntypedFormBuilder,
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
      const data: RequestQuestionData = this.questionForm.value as RequestQuestionData
      this.sendMailService.sendQuestionMail(data).subscribe(() => {
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
