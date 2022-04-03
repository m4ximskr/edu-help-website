import { Component} from '@angular/core';

@Component({
  selector: 'edu-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  logoName = $localize`:@@lightLogoName:logo-light-lv.png`;
  logoPath = 'assets/images/';
}
