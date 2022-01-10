import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ToastComponent } from './toast/toast.component';
import { ToastContainerComponent } from './toast/toast-container.component';



@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    HomeComponent,
    ToastComponent,
    ToastContainerComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [SidebarComponent, HeaderComponent, HomeComponent, ToastComponent, ToastContainerComponent],
})
export class SharedModule { }
