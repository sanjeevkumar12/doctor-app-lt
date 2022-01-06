import { Component, Type, ComponentFactoryResolver, ViewChild, OnDestroy, ComponentRef, AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { InsertionDirective } from './insertion.directive';
import { Subject } from 'rxjs';
import { DialogRef } from './dialog-ref';
import {Modal} from 'bootstrap';
import { DialogContext } from './dialog-config';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  componentRef!: ComponentRef<any>;

  @ViewChild(InsertionDirective)
  insertionPoint!: InsertionDirective;

  private readonly _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();

  childComponentType!: Type<any>;
  modal!: Modal;
  config!: DialogContext;

  constructor(public el :ElementRef, private componentFactoryResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef, private dialogRef: DialogRef) {}

  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  onOverlayClicked(evt: MouseEvent) {
    evt.stopPropagation()
    this.el.nativeElement.children[0].addEventListener('hidden.bs.modal', () => {
      this.componentRef.instance.onClose();
    })
    this.modal.hide()
  }


  onSaveClicked(evt: MouseEvent) {
    evt.stopPropagation();
    //this.el.nativeElement.children[0].addEventListener('hidden.bs.modal', () => {
    this.componentRef.instance.onSave();
    //})
    //this.modal.hide()
  }

  loadChildComponent(componentType: Type<any>) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
    this.modal = new Modal(this.el.nativeElement.children[0])
    this.modal.show();
    
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  close() {
    this._onClose.next();
  }
}