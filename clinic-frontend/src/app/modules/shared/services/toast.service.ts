import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, QueryList } from '@angular/core';
import { ToastComponent } from '../toast/toast.component';
import { Toast } from 'bootstrap';
import { ToastContainerComponent } from '../toast/toast-container.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private containerComponentRef: ComponentRef<ToastContainerComponent> | null = null;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private applicationRef: ApplicationRef, private injector: Injector) {

  }

  public message(message: string, type: string, delay?: 4000): void {


    this.getContainerComponentRef();

    const componentRef = this.componentFactoryResolver.resolveComponentFactory(ToastComponent).create(this.injector);
    this.applicationRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.querySelector('.toast-container')?.append(domElem)
    const toast = new Toast(domElem.children[0]);
    toast.show()
    domElem.children[0].addEventListener('hidden.bs.toast', () => {
      domElem.children[0].remove();
      this.applicationRef.detachView(componentRef.hostView);
      componentRef.destroy();
    })
  }

  private getContainerComponentRef(): ComponentRef<ToastContainerComponent> {
    if (!this.containerComponentRef) {
      this.containerComponentRef = this.componentFactoryResolver.resolveComponentFactory(ToastContainerComponent).create(this.injector);
      this.applicationRef.attachView(this.containerComponentRef.hostView);
      const domElem = (this.containerComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);
    }
    return this.containerComponentRef;
  }

}
