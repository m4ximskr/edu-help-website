import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'edu-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIconInNamespace('edu',
      'clicked-arrow',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images2/svg/clicked-arrow.svg'));
  }

  ngOnInit(): void {
  }

}
