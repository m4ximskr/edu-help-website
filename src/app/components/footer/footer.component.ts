import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'edu-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  hideUpperSection: boolean;

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer,
              private router: Router) {
    this.iconRegistry.addSvgIconInNamespace('edu',
      'clicked-arrow',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images2/svg/clicked-arrow.svg'));

    // this.hideUpperSection = true;

    router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => this.hideUpperSection = event.url === '/pasutit');
  }

}
