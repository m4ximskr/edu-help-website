import { Component } from '@angular/core';

@Component({
  selector: 'edu-services',
  templateUrl: './advantages.component.html',
  styleUrls: ['./advantages.component.scss']
})
export class AdvantagesComponent {

  advantages = [
    {
      icon: 'verified_user',
      title: $localize`:Advantages 1 title:Augstu rezultātu garantija`,
      text: $localize`:Advantages 1 text:Mēs strādājam ar klientu līdz darba iesniegšanai un vajadzīgās atzīmes saņemšanai.`,
    },
    {
      icon: 'credit_card_off',
      title: $localize`:Advantages 2 title:BEZ priekšapmaksas`,
      text: $localize`:Advantages 2 text:Gadījumā, ja Tev nepieciešama palīdzība ar tālmācības skolām, apmaksāt darbu Tu varēsi pēc vajadzīgas atzīmes saņemšanas!`,
    },
    {
      icon: 'fact_check',
      title: $localize`:Advantages 3 title:Pārbaudīts un 100% garantēts rezultāts`,
      text: $localize`:Advantages 3 text:Darbu pilda uzticami skolēni ar izcilām priekšmeta zināšanām. Katrs izpildītājs uzņemas priekšmetu, kuru viņš labi izprot.`,
    },
    {
      icon: 'thumb_up_alt',
      title: $localize`:Advantages 4 title:Vairāk nekā “labi”`,
      text: $localize`:Advantages 4 text:65% gadījumos klienti saņem labāku atzīmi nekā bija gaidījuši. Mēs strādājam ar rezervi, lai precīzi atbilstu Tavam vēlmēm.`,
    },
    {
      icon: 'hourglass_top',
      title: $localize`:Advantages 5 title:Ātrums`,
      text: $localize`:Advantages 5 text:Darbu ar pasūtījumu mēs sākam tajā pašā dienā, kad saņemam pasūtījumu. Praktiski jebkurš pasūtījums var būt izpildīts 24 stundu laikā.`,
    },
    {
      icon: 'support_agent',
      title: $localize`:Advantages 6 title:Strādājam 24/7`,
      text: $localize`:Advantages 6 text:Mēs vienmēr esam pieejami un jebkurā brīdī esam gatavi izpildīt darbu! Strādājam arī svētku dienās.`,
    },
  ];
}
