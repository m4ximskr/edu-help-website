import {Component, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, NgForm, Validators} from '@angular/forms';
import {SendMailService} from '../../../../shared/services/send-mail.service';
import {MatDialog} from '@angular/material/dialog';
import {
  EmailNotificationComponent,
  EmailStatus, EmailType
} from '../../../../shared/components/modals/email-notification/email-notification.component';
import {NoopScrollStrategy} from '@angular/cdk/overlay';
import {
  aboutYourselfFormFieldPlaceholder,
  requiredFieldErrorText, telephoneNumberFieldErrorText
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

  joinTeamForm: UntypedFormGroup;

  aboutYourselfPlaceholder = aboutYourselfFormFieldPlaceholder;

  get getNameErrorMessage(): string {
    return this.joinTeamForm.controls.name.hasError('required') ? requiredFieldErrorText : '';
  }

  get getMessageErrorMessage(): string {
    const messageControl = this.joinTeamForm.controls.message;
    if (messageControl.hasError('required')) {
      return requiredFieldErrorText;
    } else {
      return '';
    }
  }

  get getNumberErrorMessage(): string {
    if (this.joinTeamForm.controls.number.hasError('required')) {
      return requiredFieldErrorText;
    }
    return this.joinTeamForm.controls.number.hasError('pattern') ? telephoneNumberFieldErrorText : '';
  }

  @ViewChild('ngForm', {static: false}) ngForm: NgForm;

  constructor(private formBuilder: UntypedFormBuilder,
              private sendMailService: SendMailService,
              private dialog: MatDialog) {
    this.createForm();
  }

  onFormSubmit() {
    if (this.joinTeamForm.valid) {
      this.sendMailService.sendTutoringOrderMail(this.joinTeamForm.value).subscribe(res => {
        this.createNotificationModal(EmailStatus.SUCCESS);
        this.ngForm.resetForm()
      }, err => {
        this.createNotificationModal(EmailStatus.ERROR);
      });
    }
  }

  private createForm() {
    this.joinTeamForm = this.formBuilder.group({
      name: [''],
      number: ['', [Validators.pattern('[0-9]{8}')]],
      message: ['', [Validators.maxLength(256)]],
    });
  }

  private createNotificationModal(status: EmailStatus) {
    this.dialog.open(EmailNotificationComponent, {
      scrollStrategy: new NoopScrollStrategy(),
      data: {
        status,
        type: EmailType.TUTORING,
      }
    });
  }

}
