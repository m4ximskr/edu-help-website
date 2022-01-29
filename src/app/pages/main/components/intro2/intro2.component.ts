import { Component, OnInit } from '@angular/core';
import {clone} from 'lodash';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {
  EmailNotificationComponent,
  EmailStatus, EmailType
} from '../../../../shared/components/modals/email-notification/email-notification.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NoopScrollStrategy} from '@angular/cdk/overlay';
import {SendMailService} from '../../../../shared/services/send-mail.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'edu-intro2',
  templateUrl: './intro2.component.html',
  styleUrls: ['./intro2.component.scss']
})
export class Intro2Component implements OnInit {


  words = ['tālmācības ieskaitēm', 'mājāsdarbiem', 'kontroldarbiem'];
  wordIndex = 0;

  textPosition = 0;
  isDeleting = false;

  typewriterText = '';

  questionForm: FormGroup;

  advantages = [
    // {
    //   name: 'Pieejamas cenas skolēniem',
    //   icon: '💵',
    // },
    {
      name: 'Atlaides pastāvīgajiem klientiem',
      icon: 'present',
    },
    {
      name: 'Liels izpildītāju skaits',
      icon: 'groups',
    },
    {
      name: 'Augstā darbu izpildes kvalitāte',
      icon: 'grade',
    },
  ];

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer,
              private formBuilder: FormBuilder,
              private sendMailService: SendMailService,
              private dialog: MatDialog) {
    this.iconRegistry.addSvgIconInNamespace('edu',
      'study-work',
      // this.sanitizer.bypassSecurityTrustResourceUrl('assets/images2/svg/undraw_book_lover_re_rwjy.svg'));
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images2/svg/undraw_attached_file_re_0n9b.svg' +
        ''));
    this.iconRegistry.addSvgIcon(
      'present',
      // this.sanitizer.bypassSecurityTrustResourceUrl('assets/images2/svg/undraw_book_lover_re_rwjy.svg'));
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images2/svg/present.svg'));

    this.iconRegistry.addSvgIconInNamespace('edu',
      'dots',
      // this.sanitizer.bypassSecurityTrustResourceUrl('assets/images2/svg/undraw_book_lover_re_rwjy.svg'));
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images2/svg/dots.svg' +
        ''));

    this.iconRegistry.addSvgIconInNamespace('edu',
      'abstract',
      // this.sanitizer.bypassSecurityTrustResourceUrl('assets/images2/svg/undraw_book_lover_re_rwjy.svg'));
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images2/svg/298_Abstract_background-01.svg' +
        ''));

    this.iconRegistry.addSvgIconInNamespace('edu',
      'wave',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images2/svg/wave.svg'));

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
    } else {
      this.questionForm.markAsTouched();
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
