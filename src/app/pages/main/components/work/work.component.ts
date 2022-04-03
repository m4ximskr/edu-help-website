import { Component } from '@angular/core';

@Component({
  selector: 'edu-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent {
  private numberLinkHtml = `<a class="link" href="tel:+371 25324951">+371 25324951</a>`;
  steps = [
    {
      title: $localize`:Work 1 title:Sazināties ar mums`,
      text: $localize`:Work 1 text:Nosūti savu pieteikumu mūsu mājas lapā, sociālajos tīklos vai piesakies zvanot uz tel.nr. ${this.numberLinkHtml}.`,
    },
    {
      title: $localize`:Work 2 title:Apspriest detaļas`,
      text: $localize`:Work 2 text:Mēs vienosimies par izmaksām, izpildes termiņiem un citiem nosacījumiem.`,
    },
    {
      title: $localize`:Work 3 title:Sagaidīt darba pabeigšanu`,
      text: $localize`:Work 3 text:Darbs būs gatavs pēc iespējas ātrāk. Mēs negaidām pēdējo brīdi un pildām visu savlaicīgi.`,
    },
    {
      title: $localize`:Work 4 title:Apmaksāt rēķinu`,
      text: $localize`:Work 4 text:Mēs atsūtīsim rēķinu par mūsu pakalpojumiem, kuru Jūs varēsiet apmaksāt jebkurā brīdī.`,
    },
    {
      title: $localize`:Work 5 title:Sagaidīt atzīmi par izpildītu darbu`,
      text: $localize`:Work 5 text:Pēc darba nodošanas mēs garantējam, ka saņemsi vēlamo atzīmi.`,
    },
  ];
}
