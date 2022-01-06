import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DialogComponent } from './dialog.component'
import { InsertionDirective } from './insertion.directive';
import { MessageBoxComponent } from './message-box/message-box.component'

@NgModule({
  imports: [CommonModule],
  declarations: [DialogComponent, InsertionDirective, MessageBoxComponent],
  entryComponents: [DialogComponent, MessageBoxComponent],
})
export class DialogModule {}
