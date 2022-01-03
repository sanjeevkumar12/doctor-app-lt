import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent  } from './auth/register/register.component';
import { NotfoundComponent } from './core/components/notfound/notfound.component';
import { PrivateGuard } from './core/gaurds/private.guard';
import { PublicOnlyGuard } from './core/gaurds/public-only.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch:'full'
  },
  { path: 'dashboard',  loadChildren: () =>  import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [PrivateGuard],
    data: { showHeader: true, showSidebar: true , showFooter : true
    }
  },
  {path: 'login', component: LoginComponent, canActivate: [PublicOnlyGuard], data: { showHeader: false, showSidebar: false, showFooter : false}},
  {path: 'register', component: RegisterComponent, canActivate: [PublicOnlyGuard], data: { showHeader: false, showSidebar: false, showFooter : false}},
  { path: 'auth',  loadChildren: () =>  import('./auth/auth.module').then(m => m.AuthModule),
    data: { showHeader: false, showSidebar: false , showFooter : false
    }
  },
  {path: 'not-found', component: NotfoundComponent, data: { showHeader: false, showSidebar: false, showFooter : false}},
  {path: '**', redirectTo: '/not-found',}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
