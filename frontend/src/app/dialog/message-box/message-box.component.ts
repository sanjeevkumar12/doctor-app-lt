import { Component, Type, OnDestroy, ComponentRef, AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { DialogRef } from '../dialog-ref';
import {Modal} from 'bootstrap';
import { MessageBoxContext } from '../dialog-config';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements AfterViewInit, OnDestroy {
  componentRef!: ComponentRef<any>;

  private readonly _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();

  childComponentType!: Type<any>;
  modal!: Modal;


  constructor(public el :ElementRef,private cd: ChangeDetectorRef, private dialogRef: DialogRef , public message : MessageBoxContext) {
  }

  ngAfterViewInit() {
    this.modal = new Modal(this.el.nativeElement.children[0])
    this.modal.show();
    this.cd.detectChanges();
    this.onClose.subscribe();
    this.el.nativeElement.children[0].addEventListener('hidden.bs.modal', () => {
      this.modal.dispose();
      this.componentRef.destroy()
    })
  }

  accept(evt: MouseEvent) {
    evt.stopPropagation();
    this.closeModal(true);
  }

  reject(evt: MouseEvent){
    evt.stopPropagation();
    this.closeModal(false);
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  close(result: any) {
    this._onClose.next(result);
  }

  closeModal(result: any){
    this.close(result);
    this.dialogRef.close(result)
    this.modal.hide();
  }

}