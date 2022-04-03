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

  private _scrollToIndex$: BehaviorSubject<number> =
    new BehaviorSubject<number>(-1);
  readonly scrollToIndex$: Observable<number> =
    this._scrollToIndex$.asObservable();

  get scrollToIndex(): number {
    return this._scrollToIndex$.getValue()
  }

  constructor() { }

  updateCurrentPositionSectionIndex(index: number) {
    this._currentPositionSectionIndex$.next(index);
  }

  updateScrollToIndex(index: number) {
    this._scrollToIndex$.next(index);
  }
}
