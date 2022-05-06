import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MainModule} from './pages/main/main.module';
import {HttpClientModule} from '@angular/common/http';
import {OrderModule} from './pages/order/order.module';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
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
import {TutoringModule} from "./pages/tutoring/tutoring.module";

@NgModule({
  declarations: [
    AppComponent,
    InfoBlockComponent,
    NavigationComponent,
    MobileMenuComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainModule,
    HttpClientModule,
    OrderModule,
    TutoringModule,
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
export class AppModule {
  static injector: Injector;

  constructor(
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer,
    injector: Injector
  ) {
    AppModule.injector = injector;

    matIconRegistry.addSvgIconSetInNamespace(
      'edu',
      domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/svg/svg-defs.svg'
      )
    );
  }
}
