import {Component, OnInit} from '@angular/core';
import { Meta, Title} from '@angular/platform-browser';
import {UntilDestroy} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'edu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private titleService: Title,
    private metaService: Meta,
  ) {
    this.titleService.setTitle('Eduhelp');
    this.metaService.addTags([
      {name: 'description', content: 'Mācību palīdzības serviss'},
      {name: 'keywords', content: 'eduhelp, education, skola, palīdzība, tālmācība, mācības, universitāte, tests'}
    ])
  }

  ngOnInit() {}
}
