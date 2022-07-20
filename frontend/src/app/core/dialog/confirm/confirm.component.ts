import { Component, OnInit } from '@angular/core';
import { DialogConfig } from '../dialog-config';
import { DialogRef } from '../dialog-ref';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(public config: DialogConfig, public dialog: DialogRef) { }

  ngOnInit(): void {
  }

  onClose(action: boolean) {
    this.dialog.close(action);
  }
}
