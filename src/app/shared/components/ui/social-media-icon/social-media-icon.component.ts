import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'social-media-icon',
  templateUrl: './social-media-icon.component.html',
  styleUrls: ['./social-media-icon.component.scss']
})
export class SocialMediaIconComponent implements OnInit {

  @Input() name: string;

  get externalPath(): string {
    switch (this.name) {
      case 'vk':
        return 'https://vk.com/eduhelp_lv';
      case 'fb':
        return 'https://facebook.com/eduhelp_lv';
      case 'instagram':
        return 'https://instagram.com/eduhelp_lv';
    }
  }

  constructor() { }

  ngOnInit(): void {
  }


}
