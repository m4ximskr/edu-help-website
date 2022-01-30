import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'edu-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  steps = [
    {
      title: 'Sazināties ar mums',
      text: `Atstājiet pieteikumu mūsu mājaslapā, sociālajos tiklos, vai zvaniet pa tālruni <a class="link">+371 25324951</a>.`,
    },
    {
      title: 'Apspriest detaļas',
      text: 'Mēs ar Jums vienosimies par izmaksām, termiņiem un citiem nosacījumiem.',
    },
    {
      title: 'Apmaksāt rēķinu',
      text: 'Mēs atsūtīsim rēķinu par mūsu pakalpojumiem, kuru Jūs varēsiet apmaksāt jebkurā brīdī.',
    },
    {
      title: 'Sagaidīt darba pabeigšanu',
      text: 'Darbs būs gatavs pēc iespējas ātrāk. Mēs negaidām pēdējo brīdi un pildām visu savlaicīgi.',
    },
    {
      title: 'Sagaidīt atzīmi par izpildītu darbu ',
      text: 'Pēc jūsu darba nodošanas mēs garantējam, ka saņemsiet vēlamo atzīmi.',
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
