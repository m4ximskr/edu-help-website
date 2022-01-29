import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SendMailService} from '../../../../shared/services/send-mail.service';
import {MatDialog} from '@angular/material/dialog';
import {
  EmailNotificationComponent,
  EmailStatus, EmailType
} from '../../../../shared/components/modals/email-notification/email-notification.component';
import {NoopScrollStrategy} from '@angular/cdk/overlay';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'edu-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  questionForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private sendMailService: SendMailService,
              private dialog: MatDialog,
              private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) {
    this.createForm();

    this.iconRegistry.addSvgIconInNamespace('edu', 'chat-illustration',  this.sanitizer.bypassSecurityTrustResourceUrl('assets/images2/svg/chat-2-01.svg'));

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
