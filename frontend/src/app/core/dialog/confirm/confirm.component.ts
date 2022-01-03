import { Component, OnInit } from '@angular/core';
import { ConfirmDialogModel } from '../dialog-config';
import { DialogRef } from '../dialog-ref';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(public config: ConfirmDialogModel, public dialog: DialogRef) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialog.close('some value');
  }
}
