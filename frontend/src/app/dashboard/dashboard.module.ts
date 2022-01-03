import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  entryComponents:[
    ChangePasswordComponent
  ]
})
export class DashboardModule { }
