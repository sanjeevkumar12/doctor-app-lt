import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { InsertionDirective } from '../directives/insertion.directive';

@Component({
  selector: 'app-toast-container',
  template: `<div class="toast-container position-fixed top-0 end-0 p-3">

            <ng-template appInsertion> </ng-template>
            <ng-template #container>

            </ng-template>
  </div>`,
})
export class ToastContainerComponent implements OnInit {

  @ViewChild('container', { static: true, read: ViewContainerRef }) container!: ViewContainerRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef) { }

  @ViewChild(InsertionDirective)
  insertionPoint!: InsertionDirective

  private _insertionEnd: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
  }


}
