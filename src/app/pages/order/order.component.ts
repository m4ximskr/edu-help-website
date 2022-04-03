import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent  {

  factors = [
    {
      name: $localize`:Factors 1 title:Skolas nosaukums vai vietne (ja tā ir tālmācība)`,
      icon: '🏫',
    },
    {
      name: $localize`:Factors 2 title:Klase, kurā mācies`,
      icon: '👩‍🎓',
    },
    {
      name: $localize`:Factors 3 title:Priekšmets, kurā ir nepieciešama palīdzība`,
      icon: '📚',
    },
    {
      name: $localize`:Factors 4 title:Darba izpildes termiņi`,
      icon: '⏳',
    },
    {
      name: $localize`:Factors 5 title:Cik augsta atzīme ir nepieciešama`,
      icon: '📊',
    },
  ];

  constructor() {}
}
