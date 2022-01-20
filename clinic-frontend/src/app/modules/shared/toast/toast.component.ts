import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, AfterViewInit {

  public message: string = '';
  @ViewChild('toastItem') toast_item!: ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const toast = new Toast(this.toast_item.nativeElement);
    toast.show();
    console.log('asss')
    this.toast_item.nativeElement.addEventListener('hide.bs.toast', () => {
      console.log(this)
    })
  }


}
