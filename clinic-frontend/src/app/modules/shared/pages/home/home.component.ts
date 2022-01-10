import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.message('Hello', 'succuess');
    this.toastService.message('Hello', 'succuess');
    this.toastService.message('Hello', 'succuess');
  }

}
