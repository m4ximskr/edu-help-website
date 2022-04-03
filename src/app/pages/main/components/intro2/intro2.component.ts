import { Component, OnInit } from '@angular/core';
import {
  EmailNotificationComponent,
  EmailStatus, EmailType
} from '../../../../shared/components/modals/email-notification/email-notification.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NoopScrollStrategy} from '@angular/cdk/overlay';
import {SendMailService} from '../../../../shared/services/send-mail.service';
import {MatDialog} from '@angular/material/dialog';
import {
  emailFieldErrorText,
  requiredFieldErrorText,
  workDescriptionFormFieldPlaceholder
} from "../../../../shared/form-constants";

@Component({
  selector: 'edu-intro2',
  templateUrl: './intro2.component.html',
  styleUrls: ['./intro2.component.scss']
})
export class Intro2Component implements OnInit {

  words = [
    $localize`:Typewriter 1 word:tālmācības ieskaitēm`,
    $localize`:Typewriter 2 word:mājāsdarbiem`,
    $localize`:Typewriter 3 word:kontroldarbiem`,
  ];
  wordIndex = 0;

  textPosition = 0;
  isDeleting = false;

  typewriterText = '';

  questionForm: FormGroup;

  advantages = [
    {
      name: $localize`:Intro advantages 1 phrase:gadus aktīvi strādājam`,
      number: '4+',
    },
    {
      name: $localize`:Intro advantages 2 phrase:klientiem esam palīdzējuši`,
      number: '700+',
    },
    {
      name: $localize`:Intro advantages 3 phrase:klientu atgriezās pie mums vēl`,
      number: '70%+',
    },
  ];

  formBusy: boolean;

  workDescriptionPlaceholder = workDescriptionFormFieldPlaceholder;

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

  constructor(private formBuilder: FormBuilder,
              private sendMailService: SendMailService,
              private dialog: MatDialog) {
    this.createForm();
  }

  ngOnInit(): void {
    this.typewriter();
  }

  typewriter() {
    this.typewriterText = this.words[this.wordIndex].substring(0, this.textPosition) + '<span>&#124;</span>';
    this.textPosition = this.isDeleting ? this.textPosition - 1 : this.textPosition + 1;

    if (this.textPosition - 1 === this.words[this.wordIndex].length || this.textPosition + 1 === 0) {

      setTimeout(() => {
        this.isDeleting = !this.isDeleting;

        if (!this.isDeleting) {
          this.wordIndex = this.wordIndex + 1
          if (this.wordIndex === this.words.length) {
            this.wordIndex = 0;
          }
        }

        this.typewriter();
      }, this.textPosition === -1 ? 100 : 3000)
    } else {
      setTimeout(() => {
        this.typewriter();
      }, 100);
    }
  }

  onFormSubmit() {
    if (this.questionForm.valid) {
      this.formBusy = true;
      this.sendMailService.sendQuestionMail(this.questionForm.value).subscribe(res => {
        this.formBusy = false;
        this.createNotificationModal(EmailStatus.SUCCESS);
      }, err => {
        this.formBusy = false;
        this.createNotificationModal(EmailStatus.ERROR);
      });
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
