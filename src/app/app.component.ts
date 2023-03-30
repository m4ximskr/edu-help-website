import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer, Meta, Title} from '@angular/platform-browser';
import {fromEvent} from 'rxjs';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {startWith} from 'rxjs/operators';
import {MatSidenav} from '@angular/material/sidenav';
import {NavigationComponent} from './components/navigation/navigation.component';
import {ScrollingHelperService} from './shared/services/scrolling-helper.service';

@UntilDestroy()
@Component({
  selector: 'edu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isNavigationFixed = false;

  @ViewChild('nav') navRef: NavigationComponent;
  @ViewChild('snav') sideNavRef: MatSidenav;

  sideNavOffsetTop = 120;
  sideNavOpened = false;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private scrollingHelperService: ScrollingHelperService,
    private titleService: Title,
    private metaService: Meta,
  ) {
    this.registerIcons();
    this.listenForWindowScroll();

    this.titleService.setTitle('EDUHELP');
    this.metaService.addTags([
      { name: 'description', content: 'This is an article about Angular Meta service' },
      { name: 'keywords', content: 'angular, javascript, typescript, meta, seo' }
    ])
  }

  private registerIcons() {
    // this.iconRegistry.addSvgIconInNamespace('edu',
    //   'fb',
    //   this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/fb-coloured.svg'));
    // this.iconRegistry.addSvgIconInNamespace('edu',
    //   'vk',
    //   this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/vk-coloured.svg'));
    // this.iconRegistry.addSvgIconInNamespace('edu',
    //   'instagram',
    //   this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/ig-coloured.svg'));
    //
    // this.iconRegistry.addSvgIconInNamespace('edu',
    //   'tiktok',
    //   this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/tt-coloured.svg'));
    // this.iconRegistry.addSvgIconInNamespace('edu',
    //   'whatsapp',
    //   this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/wp-coloured.svg'));
    // this.iconRegistry.addSvgIconInNamespace('edu',
    //   'discord',
    //   this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/ds-coloured.svg'));
    //
    // this.iconRegistry.addSvgIconInNamespace('edu',
    //   'whatsapp-simple',
    //   this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/whatsapp.svg'));
    // this.iconRegistry.addSvgIconInNamespace('edu',
    //   'facebook-simple',
    //   this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/facebook.svg'));
    // this.iconRegistry.addSvgIconInNamespace('edu',
    //   'instagram-simple',
    //   this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/instagram.svg'));
    // this.iconRegistry.addSvgIconInNamespace('edu',
    //   'vk-simple',
    //   this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/vk.svg'));
    // this.iconRegistry.addSvgIconInNamespace('edu',
    //   'tiktok-simple',
    //   this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/tiktok.svg'));


    // this.iconRegistry.addSvgIconInNamespace('edu',
    //   'check',
    //   this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/check.svg'));
    //
    // this.iconRegistry.addSvgIcon(
    //   'lv',
    //   this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/lv.svg'));
    // this.iconRegistry.addSvgIcon(
    //   'ru',
    //   this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/ru.svg'));

    // this.iconRegistry.addSvgIconInNamespace('edu',
    //   'abstract',
    //   // this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/undraw_book_lover_re_rwjy.svg'));
    //   this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/298_Abstract_background-01.svg' +
    //     ''));

    // this.iconRegistry.addSvgIcon(
    //   'completedSteps',
    //   this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg/undraw_completed_steps_re_h9wc.svg'));
  }

  ngOnInit() {
  }

  toggleSideNav(state = this.sideNavOpened) {
    this.sideNavOpened = state;

    document.body.style.overflowY = this.sideNavOpened ? 'hidden' : 'auto';
    (document.activeElement as HTMLElement).blur();

    if (this.sideNavOpened) {
      if (window.pageYOffset <= 50) {
        this.sideNavOffsetTop = 120 - window.pageYOffset;
      } else {
        this.sideNavOffsetTop = 70;
      }
    }

    this.sideNavRef.toggle(this.sideNavOpened);
  }

  scrollToIndex(index: number) {
    setTimeout(() => {
      this.toggleSideNav(false);
    })
    this.scrollingHelperService.updateScrollToIndex(index);
  }

  private listenForWindowScroll() {
    // fromEvent(window, 'scroll').pipe(untilDestroyed(this)).subscribe((e) => {
    //   console.log(e);
    //   e.preventDefault();
    //   e.stopPropagation();
    //   // console.log(window.pageYOffset);
    //   if (window.pageYOffset <= 50) {
    //     this.sideNavOffsetTop = 120 - window.pageYOffset;
    //     console.log(this.sideNavOffsetTop);
    //   }
    // })
  }
}
