import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, NgForm, Validators} from '@angular/forms';
import {SendMailService} from '../../../services/send-mail.service';
import {MatDialog} from '@angular/material/dialog';
import {
  EmailNotificationComponent,
  EmailStatus,
  EmailType
} from '../../modals/email-notification/email-notification.component';
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
  styleUrls: ['./order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFormComponent implements OnInit {

  clientForm: UntypedFormGroup;
  workDescriptionPlaceholder = workDescriptionFormFieldPlaceholder;
  busy = false;

  get getNameErrorMessage(): string {
    return this.clientForm.controls.name.hasError('required') ? requiredFieldErrorText : '';
  }

  get getEmailErrorMessage(): string {
    return this.clientForm.controls.email.hasError('email') ? emailFieldErrorText : '';
  }

  get getNumberErrorMessage(): string {
    if (this.clientForm.controls.number.hasError('required')) {
      return requiredFieldErrorText;
    }
    return this.clientForm.controls.number.hasError('pattern') ? telephoneNumberFieldErrorText : '';
  }

  get getDescErrorMessage(): string {
    return this.clientForm.controls.description.hasError('required') ? requiredFieldErrorText : '';
  }

  @ViewChild('ngForm', {static: false}) ngForm: NgForm;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private sendMailService: SendMailService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {
    this.createForm();
  }

  ngOnInit() {
    // this.listenPhoneChanges();
  }

  onFormSubmit() {
    if (this.clientForm.valid) {
      this.busy = true;
      this.sendMailService.sendOrderMail(this.clientForm.value).subscribe(res => {
        this.createNotificationModal(EmailStatus.SUCCESS);
        this.busy = false;
        this.ngForm.resetForm();
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
      name: [''],
      email: ['', [Validators.email]],
      number: ['', [Validators.pattern('[0-9]{8}')]],
      description: [''],
      files: [null],
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
