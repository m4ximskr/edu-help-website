import {Component, OnDestroy, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {NoopScrollStrategy} from '@angular/cdk/overlay';
import {MatDialog} from '@angular/material/dialog';
import {ZoomedInImageComponent} from '../../modals/zoomed-in-image/zoomed-in-image.component';
import {fromEvent, Subject} from 'rxjs';
import {distinctUntilChanged, map, startWith, takeUntil, throttleTime} from 'rxjs/operators';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CarouselComponent implements OnInit, OnDestroy {

  pathBase = 'assets/images/reviews/';

  slides = [];

  reviews = [
    { src: '1.jpg' },
    { src: '2.jpg' },
    { src: '3.jpg' },
    { src: '4.jpg' },
  ];

  currentSlide = 0;

  showSlideControls = true;

  private onDestroy$ = new Subject();

  private timer = setTimeout(() => {}, 0);

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    fromEvent(window, 'resize')
      .pipe(
        takeUntil(this.onDestroy$),
        throttleTime(500),
        map(_ => window.innerWidth),
        distinctUntilChanged(),
        startWith(window.innerWidth)
      )
      .subscribe((windowWidth: number) => {
        if (windowWidth > 1300) {
          this.prepareSlides(4, false);
        }
        if (windowWidth <= 1300) {
          this.prepareSlides(2, true);
        }
        if (windowWidth <= 1000) {
          this.prepareSlides(2, true);
        }
        if (windowWidth <= 700) {
          this.prepareSlides(1, true);
        }
      });

    this.autoSlide();

  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
  }

  zoomInImage(path: string) {
    this.dialog.open(ZoomedInImageComponent, {
      scrollStrategy: new NoopScrollStrategy(),
      data: this.pathBase + path
    });
  }

  private prepareSlides(maxSlideLength: number, showState: boolean) {
    this.showSlideControls = showState;
    this.slides = [];
    let slide = [];

    this.reviews.forEach(review => {
      slide.push(review);
      if (slide.length === maxSlideLength) {
        this.slides.push({images: slide});
        slide = [];
      }
    });
  }

  private autoSlide() {
    this.timer = setTimeout(() => {
      this.onNextClick();
      clearTimeout(this.timer);
      this.autoSlide();
    }, 5000);
  }

}
