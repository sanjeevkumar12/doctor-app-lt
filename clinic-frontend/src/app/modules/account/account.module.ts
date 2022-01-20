import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileComponent as DoctorProfileComponent } from "../doctor";

@NgModule({
  declarations: [
    ProfileComponent,
    DoctorProfileComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
