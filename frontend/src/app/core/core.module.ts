import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { InsertionDirective } from './dialog/insertion.directive';
import { ConfirmComponent } from './dialog/confirm/confirm.component';
import { AlertComponent } from './dialog/alert/alert.component';
import { SelectBoxDirective } from '../core/directives/select-box.directive';



@NgModule({
  declarations: [
    DialogComponent,
    InsertionDirective,
    ConfirmComponent,
    AlertComponent,
    SelectBoxDirective
  ],
  exports: [
    SelectBoxDirective
  ],
  imports: [
    CommonModule
  ],
  entryComponents: [DialogComponent, ConfirmComponent, AlertComponent]
})
export class CoreModule { }
