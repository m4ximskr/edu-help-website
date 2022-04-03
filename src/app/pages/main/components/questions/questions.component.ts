import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SendMailService} from '../../../../shared/services/send-mail.service';
import {MatDialog} from '@angular/material/dialog';
import {
  EmailNotificationComponent,
  EmailStatus, EmailType
} from '../../../../shared/components/modals/email-notification/email-notification.component';
import {NoopScrollStrategy} from '@angular/cdk/overlay';
import {
  emailFieldErrorText,
  questionFormFieldPlaceholder,
  requiredFieldErrorText
} from "../../../../shared/form-constants";

@Component({
  selector: 'edu-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  questionForm: FormGroup;

  questionPlaceholder = questionFormFieldPlaceholder;

  get getEmailErrorMessage(): string {
    const emailControl = this.questionForm.controls.email;
    if (emailControl.hasError('required')) {
      return requiredFieldErrorText;
    } else if (emailControl.hasError('email')) {
      return emailFieldErrorText;
    } else {
      return '';
    }
  }

  get getQuestionErrorMessage(): string {
    const questionControl = this.questionForm.controls.question;
    if (questionControl.hasError('required')) {
      return requiredFieldErrorText;
    } else {
      return '';
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private sendMailService: SendMailService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.createForm();
  }

  onFormSubmit() {
    if (this.questionForm.valid) {
      this.sendMailService.sendQuestionMail(this.questionForm.value).subscribe(res => {
        this.createNotificationModal(EmailStatus.SUCCESS);
      }, err => {
        this.createNotificationModal(EmailStatus.ERROR);
      });
    }
  }

  private createForm() {
    this.questionForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      question: ['', [Validators.maxLength(256)]],
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
