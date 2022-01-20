import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAuthenticated = false;
  constructor(private toastService: ToastService, private authService: AuthService) { }

  ngOnInit(): void {
    // this.toastService.message('Hello', 'succuess');
    // this.toastService.message('Hello', 'succuess');
    // this.toastService.message('Hello', 'succuess');
    this.authService.isAuthenticated.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  }


}
