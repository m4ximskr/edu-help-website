import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SendMailService} from '../../../services/send-mail.service';
import {MatDialog} from '@angular/material/dialog';
import {EmailNotificationComponent, EmailStatus, EmailType} from '../../modals/email-notification/email-notification.component';
import {NoopScrollStrategy} from '@angular/cdk/overlay';
import {distinctUntilChanged, startWith} from 'rxjs/operators';

@Component({
  selector: 'order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {

  clientForm: FormGroup;

  busy = false;

  constructor(private formBuilder: FormBuilder,
              private sendMailService: SendMailService,
              private dialog: MatDialog) {
    this.createForm();
  }

  ngOnInit() {
    this.listenPhoneChanges();
  }

  get getNameErrorMessage(): string {
    return this.clientForm.controls.name.hasError('required') ? 'Šis lauks ir obligāts' : '';
  }

  get getEmailErrorMessage(): string {
    if (this.clientForm.controls.email.hasError('required')) {
      return 'Šis lauks ir obligāts';
    }
    return this.clientForm.controls.email.hasError('email') ? 'Nepareizs email' : '';
  }

  get getNumberErrorMessage(): string {
    return this.clientForm.controls.number.hasError('pattern') ? 'Nepareizs telefona numurs' : '';;
  }

  get getDescErrorMessage(): string {
    return this.clientForm.controls.description.hasError('required') ? 'Šis lauks ir obligāts' : '';
  }



  sendMail() {
    if (this.clientForm.valid) {
      this.busy = true;
      this.sendMailService.sendOrderMail(this.clientForm.value).subscribe(res => {
        this.createNotificationModal(EmailStatus.SUCCESS);
        this.busy = false;
      }, err => {
        this.createNotificationModal(EmailStatus.ERROR);
        this.busy = false;
      })
    } else {
      this.clientForm.markAsTouched();
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
