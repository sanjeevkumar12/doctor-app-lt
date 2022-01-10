import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-toast-container',
  template: `<div class="toast-container position-fixed top-0 end-0 p-3">
            <ng-template #container>

            </ng-template>
  </div>`,
})
export class ToastContainerComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor() { }

  ngOnInit(): void {
  }

}
