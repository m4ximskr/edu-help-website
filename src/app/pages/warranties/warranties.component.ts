import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warranties',
  templateUrl: './warranties.component.html',
  styleUrls: ['./warranties.component.scss']
})
export class WarrantiesComponent implements OnInit {

  warrantiesList = [
    {
      title: `Kvalitātes nodrošināšana.`,
      text: 'Darbu veic pārbaudīti cilvēki ar lielu pieredzi. Katram priekšmetam ir izpildītājs, kas specializējasšajā jomā.',
      // icon: 'stars',
      icon: '💯',
      color: '#07d79b',
    },
    {
      title: `Maksājums tiek veikts tikai par rezultātu.`,
      text: 'Pilns maksājums tiek veikts tikai pēc darba saņemšanas. Ja nepieciešams, pēc vēlamā novērtējuma saņemšanas.',
      // icon: 'fact_check',
      icon: '🗳',
    },
    {
      title: `Izpilde laikā.`,
      text: 'Pasūtījums tiks izpildīts tieši iepriekš noteiktajā laikā, pateicoties lielajai pieredzei un izpildītāju skaitam.',
      // icon: 'alarm_on',
      icon: '⏰',
    },
    {
      title: 'Pieejamas cenas.',
      text: 'Atlaides pastāvīgajiem klientiem, ka arī akcijas un promokodi! Sīkāka informācija mūsu instagramā.',
      // icon: 'sentiment_very_satisfied',
      icon: '🏷',
    },
    {
      title: `Pilnīga pieejamība.`,
      text: 'Iespēja saņemt bezmaksas konsultāciju vai uzzināt pasūtījuma izpildes stadiju.',
      // icon: 'published_with_changes',
      icon: '🙆‍♂️‍',

    },
    {
      title: 'Pozitīva statistika.',
      text: 'Vairāk nekā 80% gadījumu, kad saņemtais vērtējums bija augstāks nekā iepriekš norunātais.',
      // icon: 'sentiment_very_satisfied',
      icon: '🙂',
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
