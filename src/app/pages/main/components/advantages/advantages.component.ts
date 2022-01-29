import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'edu-services',
  templateUrl: './advantages.component.html',
  styleUrls: ['./advantages.component.scss']
})
export class AdvantagesComponent implements OnInit {

  advantages = [
    {
      icon: 'verified_user',
      title: 'Pilna rezultāta garantija',
      text: 'Mēs strādājam ar klientu līdz pilnīgai darba iesniegšanai un vajadzīgas atzīmes saņemšanai.',
    },
    {
      icon: 'credit_card_off',
      title: 'BEZ priekšapmaksas',
      text: 'Gadījumā, ja Tev nepieciešama palīdzība ar tālmācības skolām, apmaksāt darbu Tu varēsi pēc vajadzīgas atzīmes saņemšanas!',
    },
    {
      icon: 'fact_check',
      title: 'Pārbaudīts un 100% garantēts rezultāts',
      text: 'Darbu pilda uzticami skolēni ar izcilām priekšmeta zināšanām. Katrs izpildītājs uzņemas priekšmetu, kuru viņš labi izprot.',
    },
    {
      icon: 'thumb_up_alt',
      title: 'Vairāk nekā “labi”',
      text: '65% gadījumos klienti saņem labāko atzīmi nekā bija sagaidījuši. Mēs strādājam ar rezervi, lai precīzi atbilstu Tavam vēlmēm.',
    },
    {
      icon: 'hourglass_top',
      title: 'Ātrums',
      text: 'Darbu ar pasūtījumu mēs sākam tajā pašā dienā, kad saņemam pasūtījumu. Praktiski jebkurš pasūtījums var būt izpildīts 24 stundu laikā.',
    },
    {
      icon: 'support_agent',
      title: 'Strādājam 24/7',
      text: 'Mēs vienmēr esam pieejami un jebkurā brīdī esam gatavi izpildīt darbu! Strādājam arī svētku dienās.',
    },
  ];

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIcon(
      'experts_image',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images2/svg/undraw_experts_re_i40h.svg'));

    this.iconRegistry.addSvgIcon(
      'blob_image',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/images2/svg/blob.svg'));
  }

  ngOnInit(): void {
  }

}
