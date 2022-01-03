import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicOnlyGuard } from '../core/gaurds/public-only.guard';
import { ForgotPasswordResetComponent } from './forgot-password-reset/forgot-password-reset.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'forgot-password', component: ForgotPasswordComponent , canActivate: [PublicOnlyGuard]},
  { path: 'forgot-password/reset', component: ForgotPasswordResetComponent , canActivate: [PublicOnlyGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }