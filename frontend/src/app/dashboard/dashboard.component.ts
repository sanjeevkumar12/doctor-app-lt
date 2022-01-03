import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { DialogService } from '../dialog/dialog.service';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public dialogService: DialogService, public auth : AuthService) { 
    // const dialog = this.dialogService.open(ChangePasswordComponent,{}).afterClosed.subscribe(result => {
    //   console.log('Dialog closed', result);
    // });
    this.dialogService.confirm('Change Password', 'Save');
  }

  ngOnInit(): void {
  }

  changePassword(){

  }

}
