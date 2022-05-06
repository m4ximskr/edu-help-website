import { Component, OnInit } from '@angular/core';
import {interval} from "rxjs";
import {map} from "rxjs/operators";
import * as moment from "moment";

@Component({
  selector: 'edu-info-block',
  templateUrl: './info-block.component.html',
  styleUrls: ['./info-block.component.scss']
})
export class InfoBlockComponent implements OnInit {

  time: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number
  } = null

  private endDate: Date = new Date('May 20, 2022');

  constructor() {
    interval(1000).pipe(
      map(() => Math.floor((this.endDate.getTime() - new Date().getTime())))
    ).subscribe((diff) => {
      this.time = {
        days: this.getDays(diff),
        hours: this.getHours(diff),
        minutes: this.getMinutes(diff),
        seconds: this.getSeconds(diff),
      }
    });
  }

  ngOnInit(): void {
  }

  getDays(t) {
    return Math.floor( t / (1000 * 60 * 60 * 24) );
  }

  getHours(t) {
    return Math.floor( (t / (1000 * 60 * 60)) % 24 );
  }

  getMinutes(t) {
    return Math.floor( (t / 1000 / 60) % 60 );
  }

  getSeconds(t) {
    return Math.floor( (t / 1000) % 60 );
  }

}
