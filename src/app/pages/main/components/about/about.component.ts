import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'edu-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  services = [
    {
    title: 'Palīdzība ar tālmācības skolām:',
      parts: [
        'Rīgas 1. Tālmācības vidusskola',
        'Rīgas 1. vidusskola',
        'Rīgas Komercskola',
        'Eiropas Tālmācības vidusskola',
        'Rīgas Tālmācības vidusskola',
        'un citas',
      ]
  },
    {
      title: 'Online platformas:',
      parts: [
        'uzdevumi.lv',
        'macibas.e-skola.lv',
        'soma.lv',
        'un citas',
      ],
    },
    {
      title: 'Atsevišķi darbi, kurus vajag izpildīt līdz noteiktajam termiņam',
    },
    {
      title: 'Online palīdzība ar darbiem noteiktajā laikā',
    },
    {
      title: 'Visu semestra darbu izpilde uz vajadzīgām atzīmēm vakarskolās',
    },
    {
      title: 'Palīdzība tehnisko universitāšu studentiem',
    }
  ]

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIconInNamespace('edu', 'about-illustration',  this.sanitizer.bypassSecurityTrustResourceUrl('assets/images2/svg/education-woman-3.svg'));
    // this.iconRegistry.addSvgIcon(
    //   'about-illustration',
    //   this.sanitizer.bypassSecurityTrustResourceUrl('assets/images2/svg/undraw_education_f8ru.svg'));
  }

  ngOnInit(): void {
  }

}
