import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { InsertionDirective } from './dialog/insertion.directive';
import { ConfirmComponent } from './dialog/confirm/confirm.component';
import { AlertComponent } from './dialog/alert/alert.component';



@NgModule({
  declarations: [
    DialogComponent,
    InsertionDirective,
    ConfirmComponent,
    AlertComponent
  ],
  imports: [
    CommonModule
  ],
  entryComponents: [DialogComponent, ConfirmComponent, AlertComponent]
})
export class CoreModule { }
