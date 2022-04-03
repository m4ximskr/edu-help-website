import { Component, OnInit, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {distinctUntilChanged, map, startWith, throttleTime} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'edu-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @ViewChild('slidesRef', { static: true }) slidesRef;
  @ViewChild('sliderWrapperRef', { static: true }) sliderWrapperRef;

  pathBase = 'assets/images/reviews/';

  reviews = [
    { src: '1.jpg' },
    { src: '2.jpg' },
    { src: '3.jpg' },
    { src: '4.jpg' },
    { src: '5.jpg' },
    { src: '6.jpg' },
  ]

  slides = [];

  slidesTotalLength: number;
  slideIndex = 0;
  slideWidth: number;
  slideHeight: number;

  slidesLeftPadding = 0;
  slideItemWidth: number;

  itemsPerSlide: number;
  items = [];
  itemIndex = 0;

  shifting = false;
  allowShift = true;

  private timer = 0;

  constructor() { }

  ngOnInit(): void {
    this.listenForSlideTransitioned();
    this.listenForWindowResize();
  }

  handleSliderAction(dir: 1 | -1) {
    this.clearTimer();
    this.shiftSlide(dir);
  }

  shiftSlide(dir: 1 | -1) {
    this.shifting = true;

    if (this.allowShift) {

      const initialSlidesOffsetLeft = this.slidesRef.nativeElement.offsetLeft;

      if (dir === 1) {
        this.slidesLeftPadding = (initialSlidesOffsetLeft - this.slideItemWidth);

        if (this.slidesLeftPadding - 50 <= -(this.slideWidth + this.slideWidth * this.slideIndex)) {
          this.slideIndex++;
        }

        this.itemIndex =
          this.itemIndex < this.items.length - 1 ? this.itemIndex + 1 : 0;
      } else if (dir === -1) {
        this.slidesLeftPadding = (initialSlidesOffsetLeft + this.slideItemWidth);

        if (this.slidesLeftPadding - this.slideWidth + 50 >= -(this.slideWidth + this.slideWidth * this.slideIndex)) {
          this.slideIndex--;
        }

        this.itemIndex =
          this.itemIndex > 0 ? this.itemIndex - 1 : this.items.length - 1
      }
    }

    this.allowShift = false;
  }

  private clearTimer() {
    clearTimeout(this.timer);
    this.timer = 0;
  }

  private checkSlideIndex() {
    this.shifting = false;

    if (this.slideIndex === -1) {
      this.slidesLeftPadding = -(this.slidesTotalLength * this.slideWidth);
      this.slideIndex = this.slidesTotalLength - 1;
    }

    if (this.itemIndex === 0) {
      this.slidesLeftPadding = -this.slideWidth;
      this.slideIndex = 0;
    }

    this.allowShift = true;
  }

  private buildSlides(itemsPerSlide: number) {
    this.slides = [];
    let slide = [];

    this.reviews.forEach(review => {
      slide.push(review);
      if (slide.length === itemsPerSlide) {
        this.slides.push({images: slide});
        slide = [];
      }
    });
    this.slidesTotalLength = this.slides.length;
    this.slides.splice(0, 0, this.slides[this.slides.length - 1])
    this.slides.push(this.slides[1])
  }

  private calculateInitialValues(itemsPerSlide: number) {
    this.itemsPerSlide = itemsPerSlide;
    this.items = Array.from(Array(this.itemsPerSlide*this.slidesTotalLength).keys())
    this.slideWidth = this.sliderWrapperRef.nativeElement.offsetWidth;
    this.slideItemWidth = Math.round(this.slideWidth / this.itemsPerSlide);
    this.slideIndex = 0;
    this.itemIndex = 0;
    this.slidesLeftPadding = -this.slideWidth;
  }

  private autoSlide() {
    this.timer = window.setTimeout(() => {
      this.clearTimer();
      this.shiftSlide(1);
    }, 5000);
  }

  private listenForSlideTransitioned() {
    fromEvent(this.slidesRef.nativeElement, 'transitionend').pipe(untilDestroyed(this)).subscribe(() => {
      this.checkSlideIndex();
      this.autoSlide();
    })
  }

  private listenForWindowResize() {
    fromEvent(window, 'resize')
      .pipe(
        untilDestroyed(this),
        throttleTime(500),
        map(_ => window.innerWidth),
        distinctUntilChanged(),
        startWith(window.innerWidth)
      )
      .subscribe((windowWidth: number) => {
        this.clearTimer();

        if (windowWidth >= 1100) {
          if (this.slides.length !== 4) {
            this.buildSlides(3);
          }
          this.calculateInitialValues(3);
        } else if (windowWidth >= 750) {
          if (this.slides.length !== 5) {
            this.buildSlides(2);
          }
          this.calculateInitialValues(2);
        } else if (windowWidth < 750) {
          if (this.slides.length !== 8) {
            this.buildSlides(1);
          }
          this.calculateInitialValues(1);
        }

        this.autoSlide();
      })
  }

}
