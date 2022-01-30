import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent implements OnInit, AfterViewInit {

  @ViewChild('content', { static: true }) content;

  factors = [
    {
      name: 'Klase, kurā Jūs mācāties',
      icon: '👩‍🎓',
    },
    {
      name: 'Veicamā uzdevuma apjoms',
      icon: '🗞',
    },
    {
      name: 'Priekšmets, kurā ir nepieciešama palīdzība',
      icon: '📚',
    },
    {
      name: 'Darba izpildes termiņi',
      icon: '⏳',
    },
    {
      name: 'Cik augsta atzīme Jums ir nepieciešama',
      icon: '📊',
    },
  ];

  isCentered = true;

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer,
              private cdr: ChangeDetectorRef) {
    this.iconRegistry.addSvgIconInNamespace('edu',
      'arrow',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images2/svg/arrow.svg'));
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // console.log(this.content.nativeElement.offsetTop);
    //
    // setTimeout(() => {
    //   console.log(this.content.nativeElement.offsetTop);
    //   console.log(this.content.nativeElement.offsetTop >= 70);
    //   if (this.content.nativeElement.offsetTop < 140) {
    //     this.isCentered = false
    //     // this.cdr.markForCheck();
    //   }
    // })
  }

}
