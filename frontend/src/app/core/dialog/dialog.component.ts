import { Component, Type, ViewChild, OnDestroy, HostBinding, ComponentRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { InsertionDirective } from './insertion.directive';
import { Subject } from 'rxjs';
import { DialogRef } from './dialog-ref';
import { boxAnimation} from '../animations/dialog.animation';
import { DialogConfig } from './dialog-config';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  animations:[boxAnimation]
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  componentRef!: ComponentRef<any>;
  @HostBinding('@host') host!: any;
  
  @ViewChild(InsertionDirective)
  insertionPoint!: InsertionDirective;

  private readonly _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();

  childComponentType!: Type<any>;

  constructor(private cd: ChangeDetectorRef, private dialogRef: DialogRef, private config: DialogConfig) {
   
  }

  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  onOverlayClicked(evt: MouseEvent) {
    this.dialogRef.close();
  }

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>) {

    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear()
    this.componentRef = viewContainerRef.createComponent(componentType);
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  close() {
    this._onClose.next(null);
  }
}
