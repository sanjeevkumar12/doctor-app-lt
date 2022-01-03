import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  ComponentRef,
  Type,
  ViewContainerRef,
} from '@angular/core'
import { DialogComponent } from './dialog.component'
import { MessageBoxComponent } from './message-box/message-box.component';
import { DialogContext, MessageBoxContext } from './dialog-config';
import { DialogRef } from './dialog-ref';
import { DialogInjector } from '../dialog/dialog-injector';
import {DialogModule} from './dialog.module'

@Injectable({
  providedIn: DialogModule,
})
export class DialogService {
  dialogComponentRef!: ComponentRef<DialogComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) {}

  public open(componentType: Type<any>, config: DialogContext) {
    const dialogRef = this.appendDialogComponentToBody(config, componentType);
    return dialogRef;
  }

  private appendDialogComponentToBody(config: DialogContext,componentType: Type<any>) {
    const map = new WeakMap();
    map.set(DialogContext, config);
    const dialogRef = new DialogRef();
    map.set(DialogRef, dialogRef);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    const componentRef = componentFactory.create(new DialogInjector(this.injector, map));
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    componentRef.instance.childComponentType = componentType;
    componentRef.instance.config = config;
    componentRef.instance.onClose.subscribe(() => {
      this.removeDialogComponentFromBody(componentRef);
    });

    const sub = dialogRef.afterClosed.subscribe(() => {
      this.removeDialogComponentFromBody(componentRef);
      sub.unsubscribe();
    });
    return dialogRef;
  }

  private removeDialogComponentFromBody(dialogComponentRef: any) {
    this.appRef.detachView(dialogComponentRef.hostView);
    dialogComponentRef.destroy();
  }

  confirm(title: string, message: string, acceptBtnText: string = 'Accept',rejectBtnText: string = 'Reject' ,acceptFn?: (argument: () => boolean) => void,  rejectFn?: (argument: () => boolean) => void){
    const map = new WeakMap();
    map.set(MessageBoxContext, {title, message, acceptBtnText, rejectBtnText, type: 'confirm'});
    const dialogRef = new DialogRef();
    map.set(DialogRef, dialogRef);    
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MessageBoxComponent)
    const componentRef = componentFactory.create(new DialogInjector(this.injector, map));
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    dialogRef.afterClosed.subscribe((result)=>{
      if(result && acceptFn){
        acceptFn(result);
      }
      else if(!result && rejectFn){
        rejectFn(result);
      }     
    })
    return dialogRef;
  }

  alert(title: string, message: string, okBtnText: string = 'OK', acceptFn?: (argument: () => boolean) => void){
    const map = new WeakMap();
    map.set(MessageBoxContext, {title, message, okBtnText, type: 'confirm'});
    const dialogRef = new DialogRef();
    map.set(DialogRef, dialogRef);    
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MessageBoxComponent)
    const componentRef = componentFactory.create(new DialogInjector(this.injector, map));
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    dialogRef.afterClosed.subscribe((result)=>{
      if(acceptFn){
        acceptFn(result);
      }      
    })
    return dialogRef;
  }


}