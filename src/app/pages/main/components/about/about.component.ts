import { Component } from '@angular/core';

@Component({
  selector: 'edu-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  points = [
    {
      icon: 'flag',
      title: $localize`:About 1 title:Mērķis`,
      text:  $localize`:About 1 text:Mūsu mērķis ir dot iespēju koncentrēties uz saviem mērķiem un vērtībām, netērējot laiku un enerģiju mācību priekšmetiem, kas nav prioritātē dzīvē.`
    },
    {
      icon: 'people_alt',
      title: $localize`:About 2 title:Izpildītāji`,
      text: $localize`:About 2 text:Izpildītāji, kas strādā Eduhelp, ir sevi pierādījuši konkrētas jomas eksperti, kuriem mēs piedāvājam iespēju nopelnīt ar savām zināšanām sev interesējošā tēmā.`,
    },
    {
      icon: 'verified_user',
      title: $localize`:About 3 title:Kvalitāte`,
      text: $localize`:About 3 text:Kvalitātes nodrošināšana un individuāla pieeja ir mūsu galvenās priekšrocības, kuras mūs ievērojami atšķir no konkurentiem.`,
    }
  ]

  services = [
    {
      title: $localize`:About service 2 title:Online platformas:`,
      parts: [
        'uzdevumi.lv',
        'skolo.lv',
        'soma.lv',
        $localize`:@@andOtherText:un citas.`,
      ],
    },
    {
      title: $localize`:About service 1 title:Palīdzība un konsultācijas ar tālmācības skolām`,
      // parts: [
      //   'Rīgas 1. Tālmācības vidusskola',
      //   'Rīgas 1. vidusskola',
      //   'Rīgas Komercskola',
      //   'Eiropas Tālmācības vidusskola',
      //   'Rīgas Tālmācības vidusskola',
      //   $localize`:@@andOtherText:un citas.`,
      // ]
    },
    {
      title: $localize`:About service 3 title:Atsevišķi darbi, kurus nepieciešams izpildīt līdz noteiktajam termiņam`,
    },
    {
      title: $localize`:About service 4 title:Online palīdzība ar darbiem noteiktajā laikā`,
    },
    {
      title: $localize`:About service 5 title:Darbu izpilde uz vajadzīgo atzīmi vakarskolās`,
    },
    {
      title: $localize`:About service 6 title:Palīdzība ar prezentācijām, esejām un referatiem`,
    }
  ]
}
