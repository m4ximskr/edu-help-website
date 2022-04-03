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
  AfterViewInit, ChangeDetectorRef, AfterContentInit, Inject, LOCALE_ID
} from '@angular/core';
import { tabTitles} from './navigation';
import {MobileMenuService} from './mobile-menu/mobile-menu.service';
import {fromEvent, Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {ScrollingHelperService} from '../../shared/services/scrolling-helper.service';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
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

  langIcon = $localize`:@@langIcon:edu:ic-lv`

  logoName = $localize`:@@darkLogoName:logo-dark-lv.png`;
  logoPath = 'assets/images/';

  constructor(
    @Inject(LOCALE_ID) private localeID: string,
    private mobileMenuService: MobileMenuService,
    private scrollingHelperService: ScrollingHelperService,
    private router: Router,
  ) {
    router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        if (event.url !== '/') {
          this.tabSliderWidth = 0
        }
      });
  }

  ngOnInit(): void {
    this.scrollingHelperService.currentPositionSectionIndex$.pipe(untilDestroyed(this)).subscribe(index => {
      if (index !== -1 && this.router.url === '/') {
        this.tabSliderWidth = this.tabsRefs.toArray()[index].nativeElement.offsetWidth;
        if (index < 7) {
          this.tabSliderLeft = this.tabsRefs.toArray()[index].nativeElement.offsetLeft;
        }
      }
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.router.url === '/') {
        this.tabSliderLeft = this.tabsRefs.toArray()[0].nativeElement.offsetLeft;
        this.tabSliderWidth = this.tabsRefs.toArray()[0].nativeElement.offsetWidth;
      }
    });
  }

  scrollToIndex(index: number) {
    this.router.navigate(['']).then(() => {
      this.scrollingHelperService.updateScrollToIndex(index);
    });
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
