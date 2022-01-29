import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {fromEvent} from 'rxjs';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ScrollingHelperService} from '../../shared/services/scrolling-helper.service';

@UntilDestroy()
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChildren('section', { read: ElementRef }) sectionsRefs: QueryList<ElementRef>;

  constructor(
    private scrollingHelperService: ScrollingHelperService,
  ) { }

  ngOnInit(): void {
    fromEvent(window, 'scroll').pipe(untilDestroyed(this)).subscribe(() => {
      const index = this.sectionsRefs.toArray().findIndex(
        (section) => section.nativeElement.offsetTop + section.nativeElement.offsetHeight + 50 >= window.pageYOffset)
      this.scrollingHelperService.updateCurrentPositionSectionIndex(index);
    })

    this.scrollingHelperService.scrollToIndex$.subscribe(index => {
      window.scroll({
        top: this.sectionsRefs.toArray()[index].nativeElement.offsetTop + 51,
        behavior: 'smooth'
      })
    })
  }

}
