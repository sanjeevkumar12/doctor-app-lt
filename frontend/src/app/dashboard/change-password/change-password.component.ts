import { Component, OnInit } from '@angular/core';
import { DialogConfig } from '../../core/dialog/dialog-config';
import { DialogRef } from '../../core/dialog/dialog-ref';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(public config: DialogConfig, public dialog: DialogRef) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialog.close('some value');
  }

}
