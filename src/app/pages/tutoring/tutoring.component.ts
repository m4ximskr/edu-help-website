import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'edu-tutoring',
  templateUrl: './tutoring.component.html',
  styleUrls: ['./tutoring.component.scss']
})
export class TutoringComponent implements OnInit {

  factors = [
    {
      name: $localize`:Tutoring factors 1 title:Klase, kurā mācies`,
      icon: '👩‍🎓',
    },
    {
      name: $localize`:Tutoring factors 2 title:Priekšmets, kurā ir nepieciešama palīdzība`,
      icon: '📚',
    },
    {
      name: $localize`:Tutoring factors 3 title:Vēlamais laiks`,
      icon: '🕑',
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
