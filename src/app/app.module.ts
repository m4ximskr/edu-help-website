import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {WarrantiesModule} from './pages/warranties/warranties.module';
import {ReviewsModule} from './pages/reviews/reviews.module';
import {MainModule} from './pages/main/main.module';
import {HttpClientModule} from '@angular/common/http';
import {OrderModule} from './pages/order/order.module';
import {OrderFormModule} from './shared/components/ui/order-form/order-form.module';
import {MatIconModule} from '@angular/material/icon';
import {WorkModule} from './pages/work/work.module';
import {NotFoundModule} from './pages/not-found/not-found.module';
import {SnackBarInfoModule} from './shared/components/modals/snack-bar-info/snack-bar-info.module';
import { InfoBlockComponent } from './components/info-block/info-block.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {FooterComponent} from './components/footer/footer.component';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {RouterModule} from '@angular/router';
import {MobileMenuComponent} from './components/navigation/mobile-menu/mobile-menu.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ScrollingHelperService} from './shared/services/scrolling-helper.service';
import { SideNavComponent } from './components/side-nav/side-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoBlockComponent,
    NavigationComponent,
    MobileMenuComponent,
    FooterComponent,
    SideNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainModule,
    HttpClientModule,
    OrderModule,
    MatIconModule,
    NotFoundModule,
    SnackBarInfoModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  providers: [
    ScrollingHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
