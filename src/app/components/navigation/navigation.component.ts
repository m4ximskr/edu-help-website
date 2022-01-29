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
import { navigationList } from './navigation';
import {MobileMenuService} from './mobile-menu/mobile-menu.service';
import {fromEvent, Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {ScrollingHelperService} from '../../shared/services/scrolling-helper.service';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'edu-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, AfterViewInit {


  @Output() toggleMenu = new EventEmitter();

  @ViewChildren('tabs') tabsRefs: QueryList<ElementRef>;

  tabTitles = [
    'Galvenā',
    'Atsauksmes',
    'Priekšrocības',
    'Process',
    'Sociālie tīkli',
    'Par mums',
    'Komanda',
    '',
  ];

  tabSliderWidth: number = 0;
  tabSliderLeft: number;

  hideTabs: boolean;

  menuOpened = false;

  constructor(
    private mobileMenuService: MobileMenuService,
    private scrollingHelperService: ScrollingHelperService,
    private router: Router
  ) {
    router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        console.log(event);
        this.hideTabs = event.url === '/pasutit'
      });
  }

  ngOnInit(): void {
    this.scrollingHelperService.currentPositionSectionIndex$.subscribe(index => {
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

  handleTabClick(index: number) {
   this.scrollingHelperService.updateScrollToIndex(index);
  }

  handleToggleMenu() {
    // this.menuOpened = !this.menuOpened
    this.toggleMenu.emit();
  }

}
