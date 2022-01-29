import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
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
    // trigger("fade", [
    //   transition("false=>true", [
    //     style({ opacity: 0 }),
    //     animate("2500ms 2000ms", style({ opacity: 1 }))
    //   ]),
    //   transition("true=>false", [
    //     style({ opacity: 1 }),
    //     animate("2500ms 2000ms", style({ opacity: 0 }))
    //   ])
    // ]),
  ]
})
export class SocialMediasComponent implements OnInit {

  imgPath = 'assets/images2/';

  // images = [
  //   {
  //     src: `url(${this.imgPath}1.jpg)`,
  //     link: 'https://instagram.com/eduhelp_lv',
  //   },
  //   {
  //     src: `url(${this.imgPath}2.jpg)`,
  //     link: 'https://instagram.com/eduhelp_lv',
  //   },
  //   {
  //     src: `url(${this.imgPath}3.jpg)`,
  //     link: 'https://instagram.com/eduhelp_lv',
  //   },
  //   {
  //     src: `url(${this.imgPath}4.jpg)`,
  //     link: 'https://vk.com/eduhelp_lv',
  //   },
  //   {
  //     src: `url(${this.imgPath}5.jpg)`,
  //     link: 'https://instagram.com/eduhelp_lv',
  //   },
  //   {
  //     src: `url(${this.imgPath}6.jpg)`,
  //     link: 'https://instagram.com/eduhelp_lv',
  //   },
  // ];

  images = [
    {
      src: `${this.imgPath}ig-screen.jpeg`,
      link: 'https://instagram.com/eduhelp_lv',
    },
    {
      src: `${this.imgPath}tt-screen.jpeg`,
      link: 'https://instagram.com/eduhelp_lv',
    }
  ];

  state = 'in';
  // state = true;
  count = 0;

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIcon(
      'social_image',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images2/svg/social-2-01.svg'));

    this.iconRegistry.addSvgIconInNamespace('edu',
      'iphone-border',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images2/svg/phone-border.svg'));
  }

  ngOnInit(): void {
  }

  onFade(event: any) {
    this.state = this.state === 'in' ? 'out' : 'in';
  }

}
