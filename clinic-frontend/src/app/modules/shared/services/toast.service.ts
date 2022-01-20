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
    this.getContainerComponentRef();
  }

  public message(message: string, type: string, delay?: 4000): void {
    const container_ref = this.getContainerComponentRef();
    const componentRef = this.componentFactoryResolver.resolveComponentFactory(ToastComponent).create(this.injector);

    //container_ref.instance.container.createComponent(ToastComponent)

    //this.applicationRef.attachView(componentRef.hostView);
    // const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    // document.querySelector('.toast-container')?.append(domElem)
    componentRef.instance.message = message;
    //container_ref.instance.loadChildComponent(ToastComponent)
    console.log(container_ref.instance.insertionPoint)
    container_ref.instance.container.insert(componentRef.hostView)
    // const el_toast = domElem.children[0];
    // const toast = new Toast(el_toast);
    // toast.show()
    // el_toast.addEventListener('hidden.bs.toast', () => {
    //   console.log(el_toast)
    //   el_toast.remove();
    //   this.applicationRef.detachView(componentRef.hostView);
    //   componentRef.destroy();
    // })
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
