import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './pages/main/main.component';
import {OrderComponent} from './pages/order/order.component';
import {TermsComponent} from './pages/terms/terms.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {TutoringComponent} from "./pages/tutoring/tutoring.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'tutoring',
    component: TutoringComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'terms',
    component: TermsComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
