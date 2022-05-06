import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  emailFieldErrorText,
  requiredFieldErrorText,
  telephoneNumberFieldErrorText,
  tutoringDescriptionFormFieldPlaceholder,
} from "../../../shared/form-constants";
import {SendMailService} from "../../../shared/services/send-mail.service";
import {MatDialog} from "@angular/material/dialog";
import {
  EmailNotificationComponent,
  EmailStatus, EmailType
} from "../../../shared/components/modals/email-notification/email-notification.component";
import {distinctUntilChanged} from "rxjs/operators";
import {NoopScrollStrategy} from "@angular/cdk/overlay";

@Component({
  selector: 'edu-tutoring-order-form',
  templateUrl: './tutoring-order-form.component.html',
  styleUrls: ['./tutoring-order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TutoringOrderFormComponent implements OnInit {

  clientForm: FormGroup;
  tutoringDescriptionPlaceholder = tutoringDescriptionFormFieldPlaceholder;
  busy = false;

  get getNameErrorMessage(): string {
    return this.clientForm.controls.name.hasError('required') ? requiredFieldErrorText : '';
  }

  get getEmailErrorMessage(): string {
    if (this.clientForm.controls.email.hasError('required')) {
      return requiredFieldErrorText;
    }
    return this.clientForm.controls.email.hasError('email') ? emailFieldErrorText : '';
  }

  get getNumberErrorMessage(): string {
    return this.clientForm.controls.number.hasError('pattern') ? telephoneNumberFieldErrorText : '';
  }

  get getDescErrorMessage(): string {
    return this.clientForm.controls.description.hasError('required') ? requiredFieldErrorText : '';
  }

  constructor(
    private formBuilder: FormBuilder,
    private sendMailService: SendMailService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.listenPhoneChanges();
  }

  onFormSubmit() {
    if (this.clientForm.valid) {
      this.busy = true;
      this.sendMailService.sendTutoringOrderMail(this.clientForm.value).subscribe(res => {
        this.createNotificationModal(EmailStatus.SUCCESS);
        this.busy = false;
        this.cdr.markForCheck();
      }, err => {
        this.createNotificationModal(EmailStatus.ERROR);
        this.busy = false;
        this.cdr.markForCheck();
      })
    }
  }

  private createForm() {
    this.clientForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      number: [''],
      description: ['', [Validators.required]],
    });
  }

  private listenPhoneChanges() {
    this.clientForm.controls.number.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
      if (value) {
        this.clientForm.controls.number.setValidators([Validators.pattern('[0-9]{8}')])
      } else {
        this.clientForm.controls.number.clearValidators();
      }
    })
  }

  private createNotificationModal(status: EmailStatus) {
    this.dialog.open(EmailNotificationComponent, {
      scrollStrategy: new NoopScrollStrategy(),
      data: {
        status,
        type: EmailType.ORDER,
      }
    });
  }

}
