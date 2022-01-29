import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'edu-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  path = '../../../../../assets/images2/icons/';

  steps = [
    {
      icon: `${this.path}/telephone.png`,
      title: 'Sazināties ar mums',
      text: `Atstājiet pieteikumu mūsu mājaslapā, sociālajos tiklos, vai zvaniet pa tālruni <a class="link">+371 25324951</a>.`,
      num: 'looks_one',
    },
    {
      icon: '💬',
      title: 'Apspriest detaļas',
      text: 'Mēs ar Jums vienosimies par izmaksām, termiņiem un citiem nosacījumiem.',
      num: 'looks_two',
    },
    {
      icon: '💳',
      title: 'Apmaksāt',
      text: 'Pēc priekšapmaksas saņemšanas mēs sākam strādāt pie jūsu darba.',
      num: 'looks_3',
    },
    {
      icon: '📅',
      title: 'Sagaidīt darba pabeigšanu',
      text: 'Tūlīt pēc darba pabeigšanas jūs saņemsiet gatavu darbu.',
      num: 'looks_4',
    },
    {
      icon: '️✅',
      title: 'Nodot savu darbu',
      text: 'Pēc jūsu darba nodošanas mēs garantējam, ka saņemsiet vēlamo atzīmi.',
      num: 'looks_5',
    },
  ];

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIcon(
      'completed_steps',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images2/svg/undraw_work_together_re_5yhn.svg'));
  }

  ngOnInit() {
  }

}
