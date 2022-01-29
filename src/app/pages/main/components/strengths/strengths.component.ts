import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'strengths',
  templateUrl: './strengths.component.html',
  styleUrls: ['./strengths.component.scss']
})
export class StrengthsComponent implements OnInit {

  path = '../../../../../assets/images2/icons/';

  strengths = [
    {
      name: 'Pieejamas cenas skolēniem',
      icon: this.path + 'money.png',
    },
    {
      name: 'Atlaides pastāvīgajiem klientiem',
      icon: this.path + 'money.png',
    },
    {
      name: 'Liels izpildītāju skaits',
      icon: this.path + 'money.png',
    },
    {
      name: 'Augstā darbu izpildes kvalitāte',
      icon: this.path + 'money.png',
    },
    // {
    //   name: 'Pieejamas cenas skolēniem',
    //   icon: this.path + 'money.png',
    // },
    // {
    //   name: 'Vēlamās atzīmes iegūšanas garantija',
    //   icon: this.path + 'done.png',
    // },
    // {
    //   name: 'Atlaides pastāvīgajiem klientiem',
    //   icon: this.path + 'gift.png',
    // },
    // {
    //   name: 'Individuālais darbs ar katru klientu',
    //   icon: this.path + 'support.png',
    // },
    // {
    //   name: 'Pieejamība jebkurā laikā',
    //   icon: this.path + 'available.png',
    // },
    // {
    //   name: 'Ātra izpildīšana',
    //   icon: this.path + 'sandwatch.png',
    // },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
