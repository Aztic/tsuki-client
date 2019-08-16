import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SpinnerOverlayComponent } from '../components/spinner-overlay/spinner-overlay.component';

function sleep(ms)  {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  });
}

@Injectable({
  providedIn: 'root'
})
export class SpinnerOverlayService {
  public overlayRef: OverlayRef = null;
  constructor(private overlay: Overlay) {}
  private comp: SpinnerOverlayComponent = null;

  show = () => {
    // Returns an OverlayRef (which is a PortalHost)

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }

    // Create ComponentPortal that can be attached to a PortalHost
    const spinnerOverlayPortal = new ComponentPortal(SpinnerOverlayComponent);
    const component = this.overlayRef.attach(spinnerOverlayPortal); // Attach ComponentPortal to PortalHost
    this.comp = component.instance;
  }

  hide = () => {
    return new Promise((resolve) => {
      if (!!this.overlayRef) {
        this.comp.addHide();
        sleep(500).then(() => {
          this.overlayRef.detach();
          resolve();
        } );
      } else {
        resolve();
      }
    });
  }
}
