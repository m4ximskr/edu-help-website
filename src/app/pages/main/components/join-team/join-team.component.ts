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
  selector: 'edu-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['./join-team.component.scss']
})
export class JoinTeamComponent implements OnInit {

  warranties = [
    {
      title: 'Brīvs grafiks',
      desc: 'Strādā tad, kad tev ir ērti. Galvenais, ja paņēmi darbu - izpildi to laikā.'
    },
    {
      title: 'Stabīlas izmaksas',
      desc: 'Tu pats regulē šo skaitli. Savukārt mēs garantējam ikmēneša izmaksas',
    },
    {
      title: 'Pilnīgā konfidencialitāte',
      desc: 'Tavi personas dati ir pilnībā pasargāti no trešo personu izmantošanas.',
    }
  ]

  joinTeamForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private sendMailService: SendMailService,
              private dialog: MatDialog,
              private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIconInNamespace('edu',
      'team',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images2/svg/team-2-01.svg'));

    this.createForm();
  }

  ngOnInit() {
  }

  get getNameErrorMessage(): string {
    return this.joinTeamForm.controls.name.hasError('required') ? 'Šis lauks ir obligāts' : '';
  }

  get getEmailErrorMessage(): string {
    const emailControl = this.joinTeamForm.controls.email;
    if (emailControl.hasError('required')) {
      return 'Šis lauks ir obligāts';
    } else if (emailControl.hasError('email')) {
      return 'Nepareizs email';
    } else {
      return '';
    }
  }

  get getQuestionErrorMessage(): string {
    const questionControl = this.joinTeamForm.controls.question;
    if (questionControl.hasError('required')) {
      return 'Šis lauks ir obligāts';
    } else {
      return '';
    }
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
