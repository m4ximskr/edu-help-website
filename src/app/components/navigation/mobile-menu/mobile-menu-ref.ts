import { OverlayRef } from '@angular/cdk/overlay';
import { filter, take } from 'rxjs/operators';
import {MobileMenuComponent} from './mobile-menu.component';
import {Subject} from 'rxjs';

export class MobileMenuRef {

  componentInstance: MobileMenuComponent;

  private overlayRemovedSubj = new Subject<number>();
  public readonly overlayRemoved$ = this.overlayRemovedSubj.asObservable();

  constructor(private overlayRef: OverlayRef) {
    this.overlayRef.backdropClick().subscribe(() => {
      this.close()
    });
  }

  close(index?: number): void {
    this.componentInstance.animationStateChanged.pipe(
      filter(event => event['phaseName'] === 'start'),
      take(1)
    ).subscribe(() => {
      this.overlayRef.detachBackdrop();
    });

    this.componentInstance.animationStateChanged.pipe(
      filter(event => event['phaseName'] === 'done' && event['toState'] === 'leave'),
      take(1)
    ).subscribe(() => {
      this.overlayRef.dispose();
      this.componentInstance = null;
      this.overlayRemovedSubj.next(index);
    });

    this.componentInstance.startExitAnimation();
  }
}
