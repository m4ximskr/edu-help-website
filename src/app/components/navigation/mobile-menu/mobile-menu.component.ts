import { Component, OnInit, EventEmitter } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { tabTitles} from '../navigation';
import {MobileMenuRef} from './mobile-menu-ref';

const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
  selector: 'mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
  animations: [
    trigger('slideContent', [
      state('void', style({ transform: 'translateX(100%)'})),
      state('enter', style({ transform: 'translateX(0)' })),
      state('leave', style({ transform: 'translateX(100%)' })),
      transition('* => *', animate(ANIMATION_TIMINGS)),
    ])
  ]
})
export class MobileMenuComponent implements OnInit {

  animationState: 'void' | 'enter' | 'leave' = 'enter';

  animationStateChanged = new EventEmitter<AnimationEvent>();

  tabs = tabTitles;

  constructor(public mobileMenuRef: MobileMenuRef) { }

  ngOnInit() {
  }

  onAnimationStart(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  onAnimationDone(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  startExitAnimation() {
    this.animationState = 'leave';
  }

  close(index?: number) {
    this.mobileMenuRef.close(index);
  }
}
