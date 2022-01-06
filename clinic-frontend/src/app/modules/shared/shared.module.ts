import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';


@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [SidebarComponent, HeaderComponent],
})
export class SharedModule { }
