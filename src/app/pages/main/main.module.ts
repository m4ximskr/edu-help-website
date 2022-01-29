import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainComponent} from './main.component';
import {ContactsModule} from '../../shared/components/ui/contacts/contacts.module';
import {IntroductionComponent} from './components/introduction/introduction.component';
import {StrengthsComponent} from './components/strengths/strengths.component';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import { SocialMediasComponent } from './components/social-medias/social-medias.component';
import {QuestionFormModule} from '../../shared/components/ui/question-form/question-form.module';
import {SocialMediaIconModule} from '../../shared/components/ui/social-media-icon/social-media-icon.module';
import {MatIconModule} from '@angular/material/icon';
import { AdvantagesComponent } from './components/advantages/advantages.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import {WorkComponent} from './components/work/work.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { SliderComponent } from './components/reviews/slider/slider.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { JoinTeamComponent } from './components/join-team/join-team.component';
import { AboutComponent } from './components/about/about.component';
import { QuestionsComponent } from './components/questions/questions.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Intro2Component } from './components/intro2/intro2.component';
import { ActionComponent } from './components/action/action.component';

@NgModule({
  declarations: [MainComponent, IntroductionComponent, StrengthsComponent, SocialMediasComponent, AdvantagesComponent, ContactFormComponent, WorkComponent, ReviewsComponent, SliderComponent, JoinTeamComponent, AboutComponent, QuestionsComponent, Intro2Component, ActionComponent],
  imports: [
    CommonModule,
    ContactsModule,
    MatButtonModule,
    RouterModule,
    QuestionFormModule,
    SocialMediaIconModule,
    MatIconModule,
    ScrollingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [MainComponent],
})
export class MainModule { }
