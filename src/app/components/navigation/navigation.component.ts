import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  ViewChildren,
  ElementRef,
  QueryList,
  AfterViewInit, ChangeDetectorRef, AfterContentInit
} from '@angular/core';
import { tabTitles} from './navigation';
import {MobileMenuService} from './mobile-menu/mobile-menu.service';
import {fromEvent, Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {ScrollingHelperService} from '../../shared/services/scrolling-helper.service';
import {NavigationStart, Router} from '@angular/router';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'edu-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, AfterViewInit {

  @Output() toggleMenu = new EventEmitter();
  @ViewChild('navigation') navigationRef: ElementRef;
  @ViewChildren('tabs') tabsRefs: QueryList<ElementRef>;

  tabs = tabTitles;

  tabSliderWidth: number = 0;
  tabSliderLeft: number;

  hideTabs: boolean;

  constructor(
    private mobileMenuService: MobileMenuService,
    private scrollingHelperService: ScrollingHelperService,
    private router: Router
  ) {
    router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        if (event.url === '/pasutit') {
          this.tabSliderWidth = 0
        }
      });
  }

  ngOnInit(): void {
    this.scrollingHelperService.currentPositionSectionIndex$.pipe(untilDestroyed(this)).subscribe(index => {
      if (index !== -1) {
        this.tabSliderWidth = this.tabsRefs.toArray()[index].nativeElement.offsetWidth;
        if (index < 7) {
          this.tabSliderLeft = this.tabsRefs.toArray()[index].nativeElement.offsetLeft;
        }
      }
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (!this.hideTabs) {
        this.tabSliderLeft = this.tabsRefs.toArray()[1].nativeElement.offsetLeft;
      }
    });
  }

  scrollToIndex(index: number) {
    this.router.navigate(['']).then(() => {
      setTimeout(() => {
        this.scrollingHelperService.updateScrollToIndex(index);
      })
    })
  }

  openMobileMenu() {
    const mobileMenuRef = this.mobileMenuService.open(this.navigationRef)

    mobileMenuRef.overlayRemoved$.pipe(untilDestroyed(this)).subscribe(index => {
      if (index !== undefined) {
        this.scrollToIndex(index);
      }
    })
  }

}
