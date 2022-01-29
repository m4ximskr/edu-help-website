import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';



@Component({
  selector: 'introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  listTitles = [
    {
      name: 'Pieejamas cenas skolēniem',
      icon: '💵',
    },
    {
      name: 'Atlaides pastāvīgajiem klientiem',
      icon: '🎁',
    },
    {
      name: 'Liels izpildītāju skaits',
      icon: '👨‍💻',
    },
    {
      name: 'Augstā darbu izpildes kvalitāte',
      icon: '📈',
    },
  ];

  @Output() scrollTo = new EventEmitter();

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIcon(
      'rounded_check',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images2/svg/check.svg'));

    this.iconRegistry.addSvgIconInNamespace('edu',
      'town',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images2/svg/town-2.svg'));
  }

  ngOnInit() {
  }

}
