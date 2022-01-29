import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  steps = [
    {
      icon: '📞',
      title: 'Sazināties ar mums',
      text: 'Atstājiet pieteikumu mūsu mājaslapā, sociālajos tiklos, vai zvaniet pa tālruni +371 25324951.',
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

  constructor() { }

  ngOnInit(): void {
  }

}
