import {ComponentRef, ElementRef, Injectable, Injector} from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {Observable, Subject} from 'rxjs';
import {MobileMenuRef} from './mobile-menu-ref';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {MobileMenuComponent} from './mobile-menu.component';

@Injectable({
  providedIn: 'root'
})
export class MobileMenuService {

  private closeMenuSubj = new Subject<void>();
  public readonly closeMenu$ = this.closeMenuSubj.asObservable();

  private overlayRef: OverlayRef;

  private menuOverlayRef: MobileMenuRef;

  constructor(private overlay: Overlay,
              private injector: Injector) { }

  open(navRef: ElementRef) {

    const config = this.createConfig(navRef);

    this.overlayRef = this.overlay.create(config);

    this.menuOverlayRef = new MobileMenuRef(this.overlayRef);

    this.menuOverlayRef.componentInstance = this.attachDialogContainer();

    this.menuOverlayRef.overlayRemoved$.subscribe(() => this.closeMenuSubj.next());
  }

  close() {
    this.menuOverlayRef.close();
  }

  private createConfig(navRef: ElementRef): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(navRef)
      .withPositions([{
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
      }]);

    return new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      panelClass: 'burger-menu-panel',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy,
      width: '100%',
    });
  }

  private createInjector(ref: MobileMenuRef, inj: Injector) {
    const injectorTokens = new WeakMap([[MobileMenuRef, ref]]);
    return new PortalInjector(inj, injectorTokens);
  }

  private attachDialogContainer() {
    const injector = this.createInjector(this.menuOverlayRef, this.injector);
    const containerPortal = new ComponentPortal(MobileMenuComponent, null, injector);
    const containerRef: ComponentRef<MobileMenuComponent> = this.overlayRef.attach(containerPortal);

    return containerRef.instance;
  }
}
