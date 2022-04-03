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
  aboutYourselfFormFieldPlaceholder,
  emailFieldErrorText,
  requiredFieldErrorText
} from "../../../../shared/form-constants";

@Component({
  selector: 'edu-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['./join-team.component.scss']
})
export class JoinTeamComponent {

  warranties = [
    {
      title: $localize`:Team warranties list 1 title:Brīvs grafiks`,
      text: $localize`:Team warranties list 1 text:Strādā sev ērtā laikā. Galvenais, ja paņēmi darbu – izpildi to laikā.`
    },
    {
      title: $localize`:Team warranties list 2 title:Stabils darbs`,
      text: $localize`:Team warranties list 2 text:Tu pats regulē cik daudz darbu pilldīsi, savukārt mēs garantējam ikmēneša izmaksas.`,
    },
    {
      title: $localize`:Team warranties list 3 title:Laba attieksme`,
      text: $localize`:Team warranties list 3 text:Mēs nodrošinam Tavu datu konfidencialitāti, kā arī dodam iespēju atteikties no darba, kuru nevēlies pildīt.`,
    }
  ]

  joinTeamForm: FormGroup;

  aboutYourselfPlaceholder = aboutYourselfFormFieldPlaceholder;

  get getNameErrorMessage(): string {
    return this.joinTeamForm.controls.name.hasError('required') ? requiredFieldErrorText : '';
  }

  get getEmailErrorMessage(): string {
    const emailControl = this.joinTeamForm.controls.email;
    if (emailControl.hasError('required')) {
      return requiredFieldErrorText;
    } else if (emailControl.hasError('email')) {
      return emailFieldErrorText;
    } else {
      return '';
    }
  }

  get getQuestionErrorMessage(): string {
    const questionControl = this.joinTeamForm.controls.question;
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

  onFormSubmit() {
    if (this.joinTeamForm.valid) {
      this.sendMailService.sendQuestionMail(this.joinTeamForm.value).subscribe(res => {
        this.createNotificationModal(EmailStatus.SUCCESS);
      }, err => {
        this.createNotificationModal(EmailStatus.ERROR);
      });
    }
  }

  private createForm() {
    this.joinTeamForm = this.formBuilder.group({
      name: ['', [Validators.required]],
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
