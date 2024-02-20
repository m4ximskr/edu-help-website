import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, NgForm, Validators, FormControl, FormGroup} from '@angular/forms';
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
import {RequestOrderData} from "../../../interfaces/request-data";

interface OrderForm {
  name: FormControl<string>;
  email: FormControl<string>;
  number: FormControl<number>;
  description: FormControl<string>;
  files: FormControl<{filename: string, path: string}[]>;
}

@Component({
  selector: 'order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFormComponent implements OnInit {

  orderForm: FormGroup<OrderForm>;
  workDescriptionPlaceholder = workDescriptionFormFieldPlaceholder;
  busy = false;

  get getNameErrorMessage(): string {
    return this.orderForm.controls.name.hasError('required') ? requiredFieldErrorText : '';
  }

  get getEmailErrorMessage(): string {
    return this.orderForm.controls.email.hasError('email') ? emailFieldErrorText : '';
  }

  get getNumberErrorMessage(): string {
    if (this.orderForm.controls.number.hasError('required')) {
      return requiredFieldErrorText;
    }
    return this.orderForm.controls.number.hasError('pattern') ? telephoneNumberFieldErrorText : '';
  }

  get getDescErrorMessage(): string {
    return this.orderForm.controls.description.hasError('required') ? requiredFieldErrorText : '';
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
    this.listenPhoneChanges();
  }

  onFormSubmit() {
    if (this.orderForm.valid) {
      this.busy = true;
      const data: RequestOrderData = this.orderForm.value as RequestOrderData;
      this.sendMailService.sendOrderMail(data).subscribe(res => {
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
    this.orderForm = this.formBuilder.group({
      name: [''],
      email: ['', [Validators.email]],
      number: ['', [Validators.pattern('[0-9]{8}')]],
      description: [''],
      files: [null],
    });
  }

  private listenPhoneChanges() {
    this.orderForm.controls.number.valueChanges.pipe(distinctUntilChanged()).subscribe((value) => {
      if (value) {
        this.orderForm.controls.number.setValidators([Validators.pattern('[0-9]{8}')])
      } else {
        this.orderForm.controls.number.clearValidators();
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
