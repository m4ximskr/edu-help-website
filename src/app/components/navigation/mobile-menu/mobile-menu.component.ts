import { Component, OnInit, EventEmitter } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {navigationList} from '../navigation';
import {MobileMenuRef} from './mobile-menu-ref';

const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
  selector: 'mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
  animations: [
    trigger('fade', [
      state('fadeOut', style({ opacity: 0 })),
      state('fadeIn', style({ opacity: 1 })),
      transition('* => fadeIn', animate(ANIMATION_TIMINGS)),
    ]),
    trigger('slideContent', [
      // state('void', style({ transform: 'translate3d(0, 25%, 0) scale(0.9)', opacity: 0 })),
      // state('enter', style({ transform: 'none', opacity: 1 })),
      // state('leave', style({ transform: 'translate3d(0, 25%, 0)', opacity: 0 })),
      state('void', style({ height: 0 })),
      state('enter', style({ height: '100%' })),
      state('leave', style({ height: 0 })),
      transition('* => *', animate(ANIMATION_TIMINGS)),
    ])
  ]
})
export class MobileMenuComponent implements OnInit {

  animationState: 'void' | 'enter' | 'leave' = 'enter';

  animationStateChanged = new EventEmitter<AnimationEvent>();

  navigation = navigationList;

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

  close() {
    this.mobileMenuRef.close();
  }
}
