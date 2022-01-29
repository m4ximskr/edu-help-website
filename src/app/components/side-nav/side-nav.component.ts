import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'edu-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Output() scrollToIndex = new EventEmitter<number>();

  tabTitles = [
    'Galvenā',
    'Atsauksmes',
    'Priekšrocības',
    'Process',
    'Sociālie tīkli',
    'Par mums',
    'Komanda',
    '',
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
