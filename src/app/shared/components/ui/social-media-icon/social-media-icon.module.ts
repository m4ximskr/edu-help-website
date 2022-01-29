import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SocialMediaIconComponent} from './social-media-icon.component';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [SocialMediaIconComponent],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
  ],
  exports: [SocialMediaIconComponent],
})
export class SocialMediaIconModule {
}
