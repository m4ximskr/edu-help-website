import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {fromEvent} from 'rxjs';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ScrollingHelperService} from '../../shared/services/scrolling-helper.service';
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";

@UntilDestroy()
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  @ViewChildren('section', { read: ElementRef }) sectionsRefs: QueryList<ElementRef>

  headerHeight: number;

  constructor(
    private scrollingHelperService: ScrollingHelperService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(min-width: 950px)'])
      .pipe(untilDestroyed(this))
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.headerHeight = 120;
        } else {
          this.headerHeight = 70;
        }
      });


    fromEvent(window, 'scroll').pipe(untilDestroyed(this)).subscribe(() => {
      const index = this.sectionsRefs.toArray().findIndex(
        (section) => section.nativeElement.offsetTop + section.nativeElement.offsetHeight - this.headerHeight - 1 >= window.pageYOffset)
      this.scrollingHelperService.updateCurrentPositionSectionIndex(index);
    })
  }

  ngAfterViewInit() {
    this.scrollingHelperService.scrollToIndex$.pipe(untilDestroyed(this)).subscribe(index => {
      if (index !== -1 && this.sectionsRefs) {
        setTimeout(() => {
          window.scroll({
            top: this.sectionsRefs.get(index).nativeElement.offsetTop - this.headerHeight + 1,
            behavior: 'smooth'
          });
        }, 100)
      }
    });
  }
}
