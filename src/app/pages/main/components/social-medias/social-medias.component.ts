import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'edu-social-medias',
  templateUrl: './social-medias.component.html',
  styleUrls: ['./social-medias.component.scss'],
  animations: [
    trigger("fade", [
      state("in", style({ opacity: 1 })),
      state("out", style({ opacity: 0 })),
      transition("in => out", animate('1s 5s')),
      transition("out => in", animate('1s 5s'))
    ])
  ]
})
export class SocialMediasComponent {

  imgPath = 'assets/images/';

  images = [
    // {
    //   src: `${this.imgPath}fb-screenshot.png`,
    //   link: 'https://www.facebook.com/eduhelp.lv',
    // },
    {
      src: `${this.imgPath}ig-screenshot.png`,
      link: 'https://instagram.com/eduhelp_lv',
    },
    {
      src: `${this.imgPath}tt-screenshot.png`,
      link: 'https://instagram.com/eduhelp_lv',
    }
  ];

  state = 'in';
  frontIndex = 0;
  backIndex = 0;

  onFade() {
    if (this.state === 'in') {
      this.backIndex = this.frontIndex + 1 > this.images.length - 1 ? 0 : this.frontIndex + 1;
      this.state = 'out';
    } else {
      this.frontIndex = this.backIndex + 1 > this.images.length - 1 ? 0 : this.backIndex + 1;
      this.state = 'in'
    }
  }
}
