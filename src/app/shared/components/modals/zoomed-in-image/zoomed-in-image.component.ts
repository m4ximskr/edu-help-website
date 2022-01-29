import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'zoomed-in-image',
  templateUrl: './zoomed-in-image.component.html',
  styleUrls: ['./zoomed-in-image.component.scss'],
  animations: [
    trigger('closeBtnAnimation', [
      transition('void => *',[
        style({ opacity: 0 }),
        animate('5000ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ZoomedInImageComponent implements AfterViewInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngAfterViewInit(): void {
  }

}
