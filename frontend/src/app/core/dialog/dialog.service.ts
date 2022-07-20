import { Injectable, ApplicationRef, Injector, Type, EmbeddedViewRef, ComponentRef, ViewContainerRef } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { DialogInjector } from './dialog-injector';
import { DialogConfig } from './dialog-config';
import { DialogRef } from './dialog-ref';
import { CoreModule } from '../core.module';
import { AlertComponent } from './alert/alert.component';
import { ConfirmComponent } from './confirm/confirm.component';

@Injectable({
  providedIn: CoreModule
})
export class DialogService {
  dialogComponentRef!: ComponentRef<DialogComponent>;
  rootViewContainer!: ViewContainerRef;
  constructor(private appRef: ApplicationRef, private injector: Injector) {}
  setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }
  
  public open(componentType: Type<any>, config: DialogConfig) {
    const map = new WeakMap();
    map.set(DialogConfig, config);

    const dialogRef = new DialogRef();
    map.set(DialogRef, dialogRef);
    let componentRef = this.rootViewContainer.createComponent(DialogComponent, {injector : new DialogInjector(this.injector, map)} )
    componentRef.instance.childComponentType = componentType;
    componentRef.instance.onClose.subscribe(() => {
      this.removeDialogComponentFromBody(componentRef);
    });
    const sub = dialogRef.afterClosed.subscribe(() => {
      this.removeDialogComponentFromBody(componentRef);
      sub.unsubscribe();
    });
    componentRef.instance.childComponentType = componentType;
    return dialogRef;
  }

  private removeDialogComponentFromBody(componentRef: ComponentRef<DialogComponent>) {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }

  alert(title: string, message: string, callback?: CallableFunction){    
      this.open(AlertComponent,{title, message}).afterClosed.subscribe(result => {
        if(callback){
          callback(result)
        }
      });
  }
  confirm(title: string, message: string, options : {accept?: CallableFunction, reject?:CallableFunction}){    
    this.open(ConfirmComponent,{title, message}).afterClosed.subscribe(result => {
      if(result && options.accept){
        options.accept(result)
      }
      if(options.reject && !result){
        options.reject(result)
      }      
    });
  }
}
