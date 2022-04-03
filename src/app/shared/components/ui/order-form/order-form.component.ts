import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SendMailService} from '../../../services/send-mail.service';
import {MatDialog} from '@angular/material/dialog';
import {EmailNotificationComponent, EmailStatus, EmailType} from '../../modals/email-notification/email-notification.component';
import {NoopScrollStrategy} from '@angular/cdk/overlay';
import {distinctUntilChanged} from 'rxjs/operators';
import {
  emailFieldErrorText,
  requiredFieldErrorText,
  telephoneNumberFieldErrorText,
  workDescriptionFormFieldPlaceholder
} from "../../../form-constants";

@Component({
  selector: 'order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {

  clientForm: FormGroup;
  workDescriptionPlaceholder = workDescriptionFormFieldPlaceholder;
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
    private dialog: MatDialog
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.listenPhoneChanges();
  }

  onFormSubmit() {
    if (this.clientForm.valid) {
      this.busy = true;
      this.sendMailService.sendOrderMail(this.clientForm.value).subscribe(res => {
        this.createNotificationModal(EmailStatus.SUCCESS);
        this.busy = false;
      }, err => {
        this.createNotificationModal(EmailStatus.ERROR);
        this.busy = false;
      })
    }
  }

  private createForm() {
    this.clientForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      number: [''],
      description: ['', [Validators.required]],
      agreement: [false, [Validators.required]],
      files: [[]],
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
