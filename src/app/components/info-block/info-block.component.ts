import { Component, OnInit } from '@angular/core';
import {interval} from "rxjs";
import {map} from "rxjs/operators";
import * as moment from "moment";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

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

  private endDate: Date = new Date('Dec 18, 2023');

  constructor() {
    interval(1000).pipe(
      takeUntilDestroyed(),
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

  private getDays(time: number) {
    return Math.floor( time / (1000 * 60 * 60 * 24) );
  }

  private getHours(time: number) {
    return Math.floor( (time / (1000 * 60 * 60)) % 24 );
  }

  private getMinutes(time: number) {
    return Math.floor( (time / 1000 / 60) % 60 );
  }

  private getSeconds(time: number) {
    return Math.floor( (time / 1000) % 60 );
  }

}
