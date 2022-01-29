import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollingHelperService {

  private _currentPositionSectionIndex$: Subject<number> =
    new Subject<number>();
  readonly currentPositionSectionIndex$: Observable<number> =
    this._currentPositionSectionIndex$.asObservable();

  private _scrollToIndex$: Subject<number> =
    new Subject<number>();
  readonly scrollToIndex$: Observable<number> =
    this._scrollToIndex$.asObservable();

  constructor() { }

  updateCurrentPositionSectionIndex(index: number) {
    this._currentPositionSectionIndex$.next(index);
  }

  updateScrollToIndex(index: number) {
    this._scrollToIndex$.next(index);
  }
}
