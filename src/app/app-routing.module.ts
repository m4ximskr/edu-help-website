import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WarrantiesComponent} from './pages/warranties/warranties.component';
import {ReviewsComponent} from './pages/reviews/reviews.component';
import {MainComponent} from './pages/main/main.component';
import {OrderComponent} from './pages/order/order.component';
import {WorkComponent} from './pages/work/work.component';
import {TermsComponent} from './pages/terms/terms.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'pasutit',
    component: OrderComponent,
  },
  {
    path: 'atsauksmes',
    component: ReviewsComponent,
  },
  {
    path: 'process',
    component: WorkComponent,
  },
  {
    path: 'garantijas',
    component: WarrantiesComponent,
  },
  {
    path: 'noteikumi',
    component: TermsComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
